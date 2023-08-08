package md.utm.farmbot.auth.utils;

import org.springframework.util.ObjectUtils;

import javax.servlet.http.HttpServletRequest;

public class RequestUtils {
    private static final String BEARER_HEADER_PREFIX = "Bearer ";

    private RequestUtils() {
    }

    public static String getOpaqueToken(HttpServletRequest request) {
        return request.getHeader("X-Opaque-Token");
    }

    public static String getRequestToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        return !ObjectUtils.isEmpty(authorizationHeader) && authorizationHeader.startsWith("Bearer ") ? authorizationHeader.substring("Bearer ".length()) : null;
    }
}