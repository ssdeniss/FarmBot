package md.utm.farmbot.backend.controllers;

import lombok.RequiredArgsConstructor;
import md.utm.farmbot.backend.converters.UserConverter;
import md.utm.farmbot.backend.dtos.AuthenticatedUserResponse;
import md.utm.farmbot.backend.dtos.UserAuthenticationRequest;
import md.utm.farmbot.backend.exceptions.UnauthorizedException;
import md.utm.farmbot.backend.services.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/backend")
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserService userService;
    private final UserConverter userConverter;


    @PostMapping("/authenticate")
    @PreAuthorize("hasAnyAuthority(@environment.getProperty('app.serviceaccount.role'))")
    public AuthenticatedUserResponse authenticateUser(
            @RequestBody UserAuthenticationRequest credentials
    ) {
        return userService.getUserByUsername(credentials.getUsername())
                .filter(user -> ObjectUtils.isNotEmpty(user.getPassword()))
                .filter(user -> userService.checkPassword(credentials.getPassword(), user.getPassword()))
                .map(userConverter::toAuthenticatedUserDto)
                .orElseThrow(UnauthorizedException::new);
    }
}
