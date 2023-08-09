package md.utm.farmbot.auth.token;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtBuilder;
import org.springframework.util.ObjectUtils;

import javax.crypto.spec.SecretKeySpec;

@Component
public class JwtTokenProvider {

    private static final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);
    public static final String ISSUER = "iss";
    public static final String SUBJECT = "sub";
    public static final String IDENTIFIER = "uid";

    @Value("${app.serviceaccount.role}")
    private String serviceRole;

    @Value("${app.jwt.expire}")
    private int expireIn;

    @Value("${app.jwt.secret}")
    private String secret;

    private static final Duration SERVICE_TOKEN_DURATION = Duration.ofMinutes(5L);

    private Key getKey() {
        return !ObjectUtils.isEmpty(this.secret) && this.secret.trim().length() != 0 ? new SecretKeySpec((byte[]) Decoders.BASE64.decode(this.secret), SignatureAlgorithm.HS512.getJcaName()) : null;
    }

    public String generateToken(Map<String, Object> claims) {
        return this.generateToken(claims, Duration.ofSeconds((long)this.expireIn));
    }

    public String generateToken(Map<String, Object> claims, Duration duration) {
        ZoneId utcZone = ZoneId.of("UTC").normalized();
        LocalDateTime now = LocalDateTime.now(utcZone);
        LocalDateTime expiryDate = now.plusSeconds(duration.toSeconds());
        JwtBuilder builder = Jwts.builder().setClaims(claims).setIssuedAt(Date.from(now.atZone(utcZone).toInstant())).setExpiration(Date.from(expiryDate.atZone(utcZone).toInstant()));
        Key key = this.getKey();
        return key == null ? builder.compact() : builder.signWith(key).compact();
    }

    public String generateServiceToken(Map<String, Object> claims) {
        HashMap<String, Object> jwtClaims = new HashMap(claims);
        jwtClaims.put("uid", -1L);
        jwtClaims.put("perm", List.of(this.serviceRole));
        jwtClaims.putIfAbsent("iss", JwtTokenProvider.class.getName());
        jwtClaims.putIfAbsent("sub", JwtTokenProvider.class.getName());
        String token = this.generateToken(jwtClaims, SERVICE_TOKEN_DURATION);
        return "Bearer " + token;
    }

    public String generateServiceToken(String userNameKey) {
        return this.generateServiceToken(Map.of("iss", userNameKey));
    }

}
