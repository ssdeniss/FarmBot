package md.utm.farmbot.backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmbot.backend.converters.AppParametersConverter;
import md.utm.farmbot.backend.dtos.taxonomies.AppParametersListResponse;
import md.utm.farmbot.backend.dtos.taxonomies.AppParametersRequest;
import md.utm.farmbot.backend.dtos.taxonomies.AppParametersResponse;
import md.utm.farmbot.backend.models.AppParameters;
import md.utm.farmbot.backend.services.AppParametersService;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tax/app-parameters")
public class AppParametersController {
    private final AppParametersService service;
    private final AppParametersConverter converter;

    @GetMapping()
    @PreAuthorize(
            "hasAnyAuthority("
                    + "@environment.getProperty('app.serviceaccount.role'),"
                    + "T(md.utm.farmbot.backend.Permissions).ADMIN"
                    + ")"
    )
    public AppParametersListResponse search(
            @And({
                    @Spec(path = "code", params = "code", spec = LikeIgnoreCase.class),
                    @Spec(path = "name", params = "name", spec = LikeIgnoreCase.class),
            }) Specification<AppParameters> spec,
            Pageable page
    ) {
        return new AppParametersListResponse(
                service.search(spec, page),
                converter::toListResponse
        );
    }


    @GetMapping("/{id}")
    @PreAuthorize(
            "hasAnyAuthority("
                    + "@environment.getProperty('app.serviceaccount.role'),"
                    + "T(md.utm.farmbot.backend.Permissions).ADMIN"
                    + ")"
    )
    public AppParametersResponse view(
            @PathVariable("id") Long id
    ) {
        return
                service
                        .findById(id)
                        .map(converter::toResponse)
                        .getOrElseThrow(ex -> ex);
    }

    @PostMapping("")
    @PreAuthorize(
            "hasAnyAuthority("
                    + "@environment.getProperty('app.serviceaccount.role'),"
                    + "T(md.utm.farmbot.backend.Permissions).ADMIN"
                    + ")"
    )
    public AppParametersResponse create(
            @Valid @RequestBody AppParametersRequest payload
    ) {
        return
                service
                        .create(converter.toEntity(payload))
                        .map(converter::toResponse)
                        .getOrElseThrow(ex -> ex);
    }

    @PutMapping("/{id}")
    @PreAuthorize(
            "hasAnyAuthority("
                    + "@environment.getProperty('app.serviceaccount.role'),"
                    + "T(md.utm.farmbot.backend.Permissions).ADMIN"
                    + ")"
    )
    public AppParametersResponse update(
            @PathVariable("id") Long id,
            @Valid @RequestBody AppParametersRequest payload
    ) {
        return
                service
                        .update(id, converter.toEntity(payload))
                        .map(converter::toResponse)
                        .getOrElseThrow(ex -> ex);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize(
            "hasAnyAuthority("
                    + "@environment.getProperty('app.serviceaccount.role'),"
                    + "T(md.utm.farmbot.backend.Permissions).ADMIN"
                    + ")"
    )
    public ResponseEntity<Void> delete(
            @PathVariable("id") Long id
    ) {
        return
                service
                        .delete(id)
                        .getOrElseThrow(ex -> ex);
    }
}
