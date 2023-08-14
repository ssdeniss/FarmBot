package md.utm.farmbot.backend.controllers;

import lombok.RequiredArgsConstructor;
import md.utm.farmBot.servicecore.configs.security.PlatformUserDetails;
import md.utm.farmBot.servicecore.exceptions.UnauthorizedException;
import md.utm.farmbot.backend.converters.UserConverter;
import md.utm.farmbot.backend.dtos.AuthenticatedUserResponse;
import md.utm.farmbot.backend.dtos.UserAuthenticationRequest;
import md.utm.farmbot.backend.services.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserService userService;
    private final UserConverter userConverter;


    @PostMapping("/authenticate")
    @PreAuthorize("hasAnyAuthority(" +
            "@environment.getProperty('app.serviceaccount.role')" +
            ")")
    public AuthenticatedUserResponse authenticateUser(
            @RequestBody UserAuthenticationRequest credentials
    ) {
        return userService.getUserByUsername(credentials.getUsername())
                .filter(user -> ObjectUtils.isNotEmpty(user.getPassword()))
                .filter(user -> userService.checkPassword(credentials.getPassword(), user.getPassword()))
                .map(userConverter::toAuthenticatedUserDto)
                .orElseThrow(UnauthorizedException::new);
    }

    @GetMapping("/current")
    public AuthenticatedUserResponse getUserDetails(
            @AuthenticationPrincipal PlatformUserDetails principal
    ) {
        return userService
                .getUserByUsername(principal.getUsername())
                .map(userConverter::toAuthenticatedUserDto)
                .orElseThrow(UnauthorizedException::new);
    }
}
