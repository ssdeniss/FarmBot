package md.utm.farmbot.backend.utils;

import org.springframework.http.HttpHeaders;

import javax.servlet.http.HttpServletRequest;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Optional;

public class ServletUtils {
    private ServletUtils() {

    }

    public static String getOrigin(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(HttpHeaders.ORIGIN))
                .or(() -> Optional.ofNullable(request.getHeader(HttpHeaders.REFERER)).map(ref -> {
                    try {
                        var url = new URL(ref);
                        return url.getProtocol() + "://" + url.getHost() + ((url.getPort() != 80 && url.getPort() != -1) ? (":" + url.getPort()) : "");
                    } catch (MalformedURLException e) {
                        return null;
                    }
                }))
                .or(() -> Optional.ofNullable(request.getHeader("X-Forwarded-Host")))
                .orElse(request.getHeader("X-Forwarded-For"));
    }

}