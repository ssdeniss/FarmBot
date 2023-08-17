package md.utm.farmbot.backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmbot.backend.converters.PlantsConverter;
import md.utm.farmbot.backend.dtos.plants.PlantsListResponse;
import md.utm.farmbot.backend.dtos.plants.PlantsRequest;
import md.utm.farmbot.backend.dtos.plants.PlantsResponse;
import md.utm.farmbot.backend.dtos.taxonomies.PlantTypesRequest;
import md.utm.farmbot.backend.dtos.taxonomies.PlantTypesResponse;
import md.utm.farmbot.backend.models.Plants;
import md.utm.farmbot.backend.services.PlantsService;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
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
@RequestMapping("api/v1/plants")
public class PlantsController {

    private final PlantsService service;
    private final PlantsConverter converter;

    @GetMapping()
    @PreAuthorize(
            "hasAnyAuthority("
                    + "@environment.getProperty('app.serviceaccount.role'),"
                    + "T(md.utm.farmbot.backend.Permissions).ADMIN"
                    + ")"
    )
    public PlantsListResponse search(
            @And({
                    @Spec(path = "name", params = "name", spec = LikeIgnoreCase.class),
                    @Spec(path = "typeId", params = "typeId", spec = Equal.class),
            }) Specification<Plants> spec,
            Pageable page
    ) {
        return new PlantsListResponse(
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
    public PlantsResponse view(
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
    public PlantsResponse create(
            @Valid @RequestBody PlantsRequest payload
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
    public PlantsResponse update(
            @PathVariable("id") Long id,
            @Valid @RequestBody PlantsRequest payload
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
