package md.utm.farmBot.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.cors.reactive.CorsUtils;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.util.*;

@Configuration
public class CorsConfig implements WebFluxConfigurer {

    @Value("${app.gateway.ignore-origin-patterns}")
    private String ignoredPatterns;

    private static final String ALLOWED_METHODS = "GET, PUT, POST, DELETE, OPTIONS, PATCH";
    private static final String ALLOWED_HEADERS =
            HttpHeaders.CONTENT_TYPE + ", " +
                    HttpHeaders.CONTENT_LENGTH + ", " +
                    HttpHeaders.AUTHORIZATION + ", " +
                    HttpHeaders.COOKIE + ", " +
                    HttpHeaders.SET_COOKIE + ", " +
                    "X-Requested-With";
    
    private static final String ALLOW_CREDENTIALS = "true";
    private static final String MAX_AGE = "86400";

    @Bean
    public WebFilter corsFilter() {

        Set<String> patternsSet = !ignoredPatterns.equals("NONE")
                ? new HashSet<>(Arrays.asList(ignoredPatterns.split(";")))
                : new HashSet<>();

        return (ServerWebExchange ctx, WebFilterChain chain) -> {
            var request = ctx.getRequest();
            String path = request.getPath().toString();
            if (CorsUtils.isCorsRequest(request) && !patternsSet.stream()
                    .filter(el -> path.contains(el))
                    .findAny()
                    .isPresent())
            {
                var response = ctx.getResponse();
                var headers = response.getHeaders();
                headers.add("Access-Control-Allow-Origin", request.getHeaders().getFirst(HttpHeaders.ORIGIN));
                headers.add("Access-Control-Allow-Methods", ALLOWED_METHODS);
                headers.add("Access-Control-Allow-Headers", ALLOWED_HEADERS);
                headers.add("Access-Control-Allow-Credentials", ALLOW_CREDENTIALS);
                headers.add("Access-Control-Max-Age", MAX_AGE);

                if (request.getMethod() == HttpMethod.OPTIONS) {
                    response.setStatusCode(HttpStatus.OK);
                    return Mono.empty();
                }
            }
            return chain.filter(ctx);
        };
    }

}
