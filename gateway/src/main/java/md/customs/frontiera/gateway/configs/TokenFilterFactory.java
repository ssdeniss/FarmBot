package md.customs.frontiera.gateway.configs;

import io.jsonwebtoken.Jwts;
import md.customs.frontiera.gateway.GatewayApplication;
import md.customs.frontiera.gateway.clients.AuthenticationClient;
import md.customs.frontiera.gateway.utils.Consume;
import md.customs.frontiera.gateway.utils.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.time.Duration;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
public class TokenFilterFactory extends AbstractGatewayFilterFactory<TokenFilterFactory.Config> {

    private static final String SESSION_COOKIE = "sid";
    private static final String BEARER_PREFIX = "bearer";

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.serviceaccount.role}")
    private String serviceRole;

    private AuthenticationClient authenticationClient;

    public TokenFilterFactory() {
        super(Config.class);
    }

    private String generateToken() {
        var now = new Date();
        var expiryDate = new Date(now.getTime() + Duration.ofSeconds(10).toMillis());
        var key = JwtUtils.getKey(secret);
        var builder = Jwts.builder()
                .setClaims(
                        Map.of(
                                "iss", GatewayApplication.class.getName(),
                                "sub", GatewayApplication.class.getName(),
                                "uid", -1L,
                                "perm", List.of(serviceRole)
                        )
                )
                .setIssuedAt(now)
                .setExpiration(expiryDate);

        return ObjectUtils.isEmpty(secret) ? builder.compact() : builder.signWith(key).compact();
    }

    @Lazy
    @Autowired
    private void setAuthenticationClient(AuthenticationClient authenticationClient) {
        this.authenticationClient = authenticationClient;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            var request = exchange.getRequest();

            // If there is an Authorization header that DOES NOT start with BEARER prefix,
            // forward the request without altering it
            var authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            if (StringUtils.hasText(authHeader) && !authHeader.startsWith(BEARER_PREFIX)) {
                return chain.filter(exchange);
            }

            // Get authorization token from request, first from Cookie, then from Authorization header
            var opaqueToken =
                    Optional.ofNullable(request.getCookies().getFirst(SESSION_COOKIE))
                            .map(HttpCookie::getValue)
                            .orElseGet(() ->
                                    Optional.ofNullable(request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION))
                                            .filter(val -> val.toLowerCase().startsWith(BEARER_PREFIX))
                                            .map(val -> val.substring(BEARER_PREFIX.length() + 1))
                                            .orElse(null)
                            );

            // If no authorization tokens found, forward the request without altering it
            if (!StringUtils.hasText(opaqueToken)) {
                return chain.filter(exchange);
            }

            var privateJWT =
                    Consume.exception(
                            () -> authenticationClient.referenceToValue(
                                    opaqueToken,
                                    "Bearer " + generateToken()
                            ), null);

            return chain.filter(
                    exchange
                            .mutate()
                            .request(
                                    exchange.getRequest()
                                            .mutate()
                                            .headers(
                                                    httpHeaders -> {
                                                        if (!ObjectUtils.isEmpty(opaqueToken)) {
                                                            httpHeaders.set("X-Opaque-Token", opaqueToken);
                                                        }

                                                        if (ObjectUtils.isEmpty(privateJWT)) {
                                                            httpHeaders.remove(HttpHeaders.AUTHORIZATION);
                                                        } else {
                                                            httpHeaders.set(HttpHeaders.AUTHORIZATION, "Bearer " + privateJWT);
                                                        }
                                                    }
                                            )
                                            .build()
                            )
                            .build()
            );
        };
    }

    public static class Config {
    }
}