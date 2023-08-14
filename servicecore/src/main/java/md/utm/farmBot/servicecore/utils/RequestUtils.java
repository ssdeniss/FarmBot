package md.utm.farmBot.servicecore.utils;

import org.springframework.http.HttpHeaders;
import org.springframework.util.ObjectUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public class RequestUtils {
    private static final String BEARER_HEADER_PREFIX = "Bearer ";

    private RequestUtils() {

    }

    public static String getOpaqueToken(HttpServletRequest request) {
        return request.getHeader("X-Opaque-Token");
    }

    public static String getRequestToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (!ObjectUtils.isEmpty(authorizationHeader) && authorizationHeader.startsWith(BEARER_HEADER_PREFIX)) {
            return authorizationHeader.substring(BEARER_HEADER_PREFIX.length());
        }
        return null;
    }

}
