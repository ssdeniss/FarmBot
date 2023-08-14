package md.utm.farmBot.servicecore.configs.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmBot.servicecore.utils.RequestUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String BEARER_HEADER_PREFIX = "Bearer ";
    private final JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        log.debug("Trying to extract JWT Token from request");

        try {
            String jwt = RequestUtils.getRequestToken(request);
            log.debug("JWT Token found: {}", jwt);

            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                log.debug("Token is valid. Extracting user details");

                var userDetails = tokenProvider.getUserFromJWT(jwt);
                if (userDetails != null) {
                    log.debug("User name: {}", userDetails.getUsername());

                    var authentication = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    log.warn("Token does not contain valid credentials");
                }
            }
        } catch (Exception ex) {
            log.error("Could not set user authentication in security context", ex);
        }

        filterChain.doFilter(request, response);
    }
}
