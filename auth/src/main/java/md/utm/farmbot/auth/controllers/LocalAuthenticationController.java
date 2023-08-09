package md.utm.farmbot.auth.controllers;

import java.net.URI;
import javax.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmbot.auth.dtos.UsernamePasswordCredentialsDTO;
import md.utm.farmbot.auth.services.LocalAuthenticationService;
import md.utm.farmbot.auth.utils.ServletUtils;
import md.utm.farmbot.auth.exceptions.UnauthorizedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/v1/local")
@RestController
@RequiredArgsConstructor
@Slf4j
public class LocalAuthenticationController {
    @Value("${app.secure-connection}")
    private Boolean appSecureConnection;

    private final LocalAuthenticationService authenticationService;

    @PostMapping(consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public ResponseEntity<Void> login(
            @ModelAttribute UsernamePasswordCredentialsDTO credentials,
            HttpServletRequest request
    ) {
        var origin = ServletUtils.getOrigin(request);
        log.info("Authenticating user {} from {} origin", credentials.getUsername(), origin);

        try {
            var opaqueToken = this.authenticationService.localAuthentication(credentials);
            log.info("Authentication successful for user {} from {} origin", credentials.getUsername(), origin);
            var springCookie =
                    ResponseCookie.from("sid", opaqueToken)
                            .httpOnly(true)
                            .secure(appSecureConnection)
                            .path("/")
                            .maxAge(86400)
                            .domain(URI.create(origin).getHost())
                            .build();

            return ResponseEntity
                    .status(HttpStatus.FOUND)
                    .header(HttpHeaders.SET_COOKIE, springCookie.toString())
                    .header(HttpHeaders.LOCATION, origin + "/")
                    .build();

        } catch (UnauthorizedException ue) {
            log.warn(ue.getMessage());
            return ResponseEntity
                    .status(HttpStatus.SEE_OTHER)
                    .header(HttpHeaders.LOCATION, origin + "/?invalid")
                    .build();
        } catch (Exception ex) {
            log.error(ex.getMessage() + ": {}", ex);
            return ResponseEntity
                    .status(HttpStatus.SEE_OTHER)
                    .header(HttpHeaders.LOCATION, origin + "/?error")
                    .build();
        }
    }


}
