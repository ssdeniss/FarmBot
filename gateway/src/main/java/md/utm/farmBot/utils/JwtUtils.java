package md.utm.farmBot.utils;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import org.springframework.util.ObjectUtils;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

public final class JwtUtils {
    public static Key getKey(String secret) {
        if (ObjectUtils.isEmpty(secret)) {
            return null;
        }

        if (secret.trim().length() == 0) {
            return null;
        }

        return new SecretKeySpec(Decoders.BASE64.decode(secret), SignatureAlgorithm.HS512.getJcaName());
    }

    private JwtUtils() {
    }
}
