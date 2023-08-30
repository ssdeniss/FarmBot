package md.utm.farmbot.backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmBot.servicecore.dto.SearchResult;
import md.utm.farmBot.servicecore.exceptions.BadRequestException;
import md.utm.farmbot.backend.converters.ZonesConverter;
import md.utm.farmbot.backend.dtos.ZonesDTO;
import md.utm.farmbot.backend.models.Zones;
import md.utm.farmbot.backend.services.ZonesService;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.JoinFetch;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/zones")
public class ZonesController {
    private final ZonesService service;
    private final ZonesConverter converter;

    @GetMapping()
    @PreAuthorize(
            "hasAnyAuthority("
                    + "@environment.getProperty('app.serviceaccount.role'),"
                    + "T(md.utm.farmbot.backend.Permissions).ADMIN"
                    + ")"
    )
    public SearchResult<ZonesDTO> search(
            @JoinFetch(paths = "plant", alias = "plant")
            @And({
                    @Spec(path = "mode", params = "mode", spec = Equal.class),
                    @Spec(path = "plant.name", params = "plant", spec = LikeIgnoreCase.class),
            }) Specification<Zones> spec,
            Pageable page
    ) {
        return
                new SearchResult<>(service.findAll(spec, page), converter::toZoneDto);
    }


    @GetMapping("/{id}")
    @PreAuthorize(
            "hasAnyAuthority("
                    + "@environment.getProperty('app.serviceaccount.role'),"
                    + "T(md.utm.farmbot.backend.Permissions).ADMIN"
                    + ")"
    )
    public ZonesDTO view(
            @PathVariable("id") Long id
    ) {
        return
                service
                        .findById(id)
                        .map(converter::toZoneDto)
                        .getOrElseThrow(ex -> ex);
    }

    @PostMapping("")
    @PreAuthorize(
            "hasAnyAuthority("
                    + "@environment.getProperty('app.serviceaccount.role'),"
                    + "T(md.utm.farmbot.backend.Permissions).ADMIN"
                    + ")"
    )
    public ZonesDTO create(
            @Valid @RequestBody ZonesDTO payload
    ) {
        return
                service
                        .create(converter.toZone(payload))
                        .map(converter::toZoneDto)
                        .getOrElseThrow(ex -> ex);
    }

    @PutMapping("/{id}")
    @PreAuthorize(
            "hasAnyAuthority("
                    + "@environment.getProperty('app.serviceaccount.role'),"
                    + "T(md.utm.farmbot.backend.Permissions).ADMIN"
                    + ")"
    )
    public ZonesDTO update(
            @PathVariable("id") Long id,
            @Valid @RequestBody ZonesDTO payload
    ) {
        return
                service
                        .update(id, converter.toZone(payload))
                        .map(converter::toZoneDto)
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
