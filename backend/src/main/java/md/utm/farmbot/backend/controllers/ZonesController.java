package md.utm.farmbot.backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmbot.backend.converters.ZonesConverter;
import md.utm.farmbot.backend.dtos.ZonesDTO;
import md.utm.farmbot.backend.services.ZonesService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/zones")
public class ZonesController {
    private final ZonesService service;
    private final ZonesConverter converter;

    @GetMapping("/all")
    @PreAuthorize(
            "hasAnyAuthority("
                    + "@environment.getProperty('app.serviceaccount.role'),"
                    + "T(md.utm.farmbot.backend.Permissions).ADMIN"
                    + ")"
    )
    public List<ZonesDTO> findAll() {
        return service.findAll().stream()
                .map(converter::toZoneDto)
                .collect(Collectors.toList());
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
