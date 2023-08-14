package md.utm.farmbot.auth.controllers;

import lombok.RequiredArgsConstructor;
import md.utm.farmBot.servicecore.exceptions.DataNotFoundException;
import md.utm.farmbot.auth.services.TokenService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/token")
@RequiredArgsConstructor
public class TokenController {

    private final TokenService tokenService;

    @GetMapping(value = "/{reference}")
    @PreAuthorize("hasAnyAuthority(@environment.getProperty('app.serviceaccount.role'))")
    public String referenceToValue(@PathVariable String reference) throws DataNotFoundException {
        String value = tokenService.getValue(reference);

        if (ObjectUtils.isEmpty(value)) {
            throw new DataNotFoundException();
        }

        return value;
    }
}
