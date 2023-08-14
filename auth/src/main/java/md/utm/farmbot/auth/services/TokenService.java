package md.utm.farmbot.auth.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final Cache<String, String> CACHE = CacheBuilder.newBuilder()
            .expireAfterAccess(Duration.ofDays(14))
            .build();

    public String getValue(String reference) {
        return CACHE.getIfPresent(reference);
    }

    public void setValue(String reference, String value) {
        CACHE.put(reference, value);
    }

    public void deleteValue(String reference) {
        CACHE.invalidate(reference);
    }

    public Boolean contains(String reference) {
        return CACHE.asMap().containsKey(reference);
    }
}