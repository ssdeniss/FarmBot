package md.utm.farmbot.auth.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmBot.servicecore.exceptions.UnauthorizedException;
import md.utm.farmBot.servicecore.utils.RequestUtils;
import md.utm.farmbot.auth.dtos.AuthenticatedUserDTO;
import md.utm.farmbot.auth.services.AuthenticationService;
import md.utm.farmbot.auth.utils.ServletUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.util.Optional;

@RequestMapping("/v1")
@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @GetMapping("/current")
    public AuthenticatedUserDTO getCurrentUserDetails(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jwtToken
    ) {
        log.info("Get user details for JWT: {}", jwtToken);
        try {
            return authenticationService.getCurrentUserDetails(jwtToken);
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            throw new UnauthorizedException(ex.getMessage());
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logout(
            HttpServletRequest request
    ) {
        var origin = ServletUtils.getOrigin(request);
        Optional.ofNullable(RequestUtils.getOpaqueToken(request)).ifPresent(authenticationService::logout);

        var springCookie =
                ResponseCookie.from("sid", "")
                        .httpOnly(true)
                        .path("/")
                        .maxAge(0)
                        .domain(URI.create(origin).getHost())
                        .build();

        return ResponseEntity
                .status(HttpStatus.FOUND)
                .header(HttpHeaders.SET_COOKIE, springCookie.toString())
                .header(HttpHeaders.LOCATION, ServletUtils.getOrigin(request))
                .build();
    }
}
