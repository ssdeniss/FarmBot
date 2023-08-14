package md.utm.farmBot.servicecore.configs.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.SignatureException;
import java.util.HashMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JwtTokenProvider {
    public static final String ISSUER = "iss";
    public static final String SUBJECT = "sub";
    public static final String IDENTIFIER = "uid";
    public static final String PERMISSIONS = "perm";
    public static final String SESSION_INDEX = "session_index";

    private static final Duration SERVICE_TOKEN_DURATION = Duration.ofMinutes(5);

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expire}")
    private int expireIn;

    @Value("${app.serviceaccount.role}")
    private String serviceRole;

    private Key getKey() {
        if (ObjectUtils.isEmpty(secret) || (secret.trim().length() == 0)) {
            return null;
        }

        return new SecretKeySpec(Decoders.BASE64.decode(secret), SignatureAlgorithm.HS512.getJcaName());
    }

    public String generateToken(Map<String, Object> claims) {
        return generateToken(claims, Duration.ofSeconds(expireIn));
    }

    public String generateToken(Map<String, Object> claims, Duration duration) {
        var utcZone = ZoneId.of("UTC").normalized();
        var now = LocalDateTime.now(utcZone);
        var expiryDate = now.plusSeconds(duration.toSeconds());
        var builder = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Date.from(now.atZone(utcZone).toInstant()))
                .setExpiration(Date.from(expiryDate.atZone(utcZone).toInstant()));
        var key = getKey();

        return (key == null) ? builder.compact() : builder.signWith(key).compact();
    }

    public String generateServiceToken() {
        return generateServiceToken(Map.of(ISSUER, JwtTokenProvider.class.getName()));
    }

    public String generateServiceToken(String userNameKey) {
        return generateServiceToken(Map.of(ISSUER, userNameKey));
    }

    public String generateServiceToken(Map<String, Object> claims) {
        var jwtClaims = new HashMap<>(claims);

        jwtClaims.put(IDENTIFIER, -1L);
        jwtClaims.put(PERMISSIONS, List.of(serviceRole));
        jwtClaims.putIfAbsent(ISSUER, JwtTokenProvider.class.getName());
        jwtClaims.putIfAbsent(SUBJECT, JwtTokenProvider.class.getName());

        return "Bearer " + generateToken(jwtClaims, SERVICE_TOKEN_DURATION);
    }

    UserDetails getUserFromJWT(String token) {
        if (ObjectUtils.isEmpty(token)) {
            return null;
        }

        var key = getKey();

        var builder = Jwts.parserBuilder();
        var parser = ((key == null) ? builder : builder.setSigningKey(key)).build();
        var claims = parser.parseClaimsJws(token).getBody();

        log.debug("Claims extracted: {}", claims);

        if (claims.containsKey(SUBJECT) && claims.containsKey(IDENTIFIER)) {
            var roles = (List<String>) claims.get(PERMISSIONS);
            return new PlatformUserDetails(
                    claims.get(IDENTIFIER, Long.class),
                    claims.get(SUBJECT, String.class),
                    roles == null ? null : roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()),
                    claims.get(SESSION_INDEX, String.class)
            );
        } else {
            return null;
        }
    }

    boolean validateToken(String token) {
        if (ObjectUtils.isEmpty(token)) {
            return false;
        }

        try {
            var key = getKey();
            var builder = Jwts.parserBuilder();
            ((key == null) ? builder : builder.setSigningKey(key)).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token", ex);
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token", ex);
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature", ex);
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty", ex);
        }

        return false;
    }
}
