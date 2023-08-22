package md.utm.farmbot.backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmBot.servicecore.configs.security.JwtTokenProvider;
import md.utm.farmBot.servicecore.configs.security.PlatformUserDetails;
import md.utm.farmBot.servicecore.exceptions.BadRequestException;
import md.utm.farmbot.backend.BackendApplication;
import md.utm.farmbot.backend.clients.FilesClient;
import md.utm.farmbot.backend.converters.UserConverter;
import md.utm.farmbot.backend.dtos.auth.AuthenticatedUserResponse;
import md.utm.farmbot.backend.dtos.auth.ChangePasswordRequest;
import md.utm.farmbot.backend.dtos.files.Base64FileDTO;
import md.utm.farmbot.backend.models.User;
import md.utm.farmbot.backend.services.UserService;
import md.utm.farmbot.backend.utils.ServletUtils;
import md.utm.farmbot.backend.utils.UserUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final UserConverter userConverter;
    private final FilesClient filesClient;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/change-password")
    @PreAuthorize("hasAnyAuthority(" +
            "@environment.getProperty('app.serviceaccount.role')," +
            "T(md.utm.farmbot.backend.Permissions).ADMIN)")
    public ResponseEntity<Void> updateUserPassword(
            @AuthenticationPrincipal PlatformUserDetails principal,
            @Valid @RequestBody ChangePasswordRequest payload,
            HttpServletRequest request
    ) {
        var origin = ServletUtils.getOrigin(request);
        User user = userService.findById(principal.getId()).getOrElseThrow(ex->ex);
        if (userService.checkPassword(payload.getPassword(), user.getPassword())) {
            userService.changePassword(user, payload);

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
        throw new BadRequestException("Parola curentă nu coincide");
    }

    @PostMapping("/update-user/{name}/{avatar}")
    @SneakyThrows
    public AuthenticatedUserResponse updateUser(
            @AuthenticationPrincipal PlatformUserDetails principal,
            @PathVariable("name") String name,
            @PathVariable("avatar") Boolean avatar,
            @RequestBody Base64FileDTO imageFile
    ) {
        String token = jwtTokenProvider.generateServiceToken(BackendApplication.class.getName());
        User user = userService.findById(principal.getId()).getOrElseThrow(ex->ex);

        if(avatar) {
            UserUtils.setAvatarId(user, imageFile, filesClient, token);
        }
        user.setFullname(name);
        return userConverter.toAuthenticatedUserDto(userService.save(user));
    }
}
