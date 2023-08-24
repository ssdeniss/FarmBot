package md.utm.farmbot.backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmBot.servicecore.dto.SearchResult;
import md.utm.farmbot.backend.converters.EventsConverter;
import md.utm.farmbot.backend.dtos.EventsDTO;
import md.utm.farmbot.backend.models.AppParameters;
import md.utm.farmbot.backend.models.Events;
import md.utm.farmbot.backend.services.EventsService;
import net.kaczmarzyk.spring.data.jpa.domain.Between;
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
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/events")
public class EventsController {
    private final EventsService service;
    private final EventsConverter converter;

    @GetMapping("/all")
    @PreAuthorize(
            "hasAnyAuthority("
                    + "@environment.getProperty('app.serviceaccount.role'),"
                    + "T(md.utm.farmbot.backend.Permissions).ADMIN"
                    + ")"
    )
    public SearchResult<EventsDTO> search(
            @And({
                    @Spec(path = "zoneId", params = "zoneId", spec = LikeIgnoreCase.class),
                    @Spec(path = "date", params = "date", spec = Between.class),
                    @Spec(path = "isDone", params = "isDone", spec = Equal.class),
            }) Specification<Events> spec,
            Pageable page
    ) {
        return new SearchResult<>(service.search(spec,page), converter::toEventDTO);
    }


    @GetMapping("/{id}")
    @PreAuthorize(
            "hasAnyAuthority("
                    + "@environment.getProperty('app.serviceaccount.role'),"
                    + "T(md.utm.farmbot.backend.Permissions).ADMIN"
                    + ")"
    )
    public EventsDTO view(
            @PathVariable("id") Long id
    ) {
        return
                service
                        .findById(id)
                        .map(converter::toEventDTO)
                        .getOrElseThrow(ex -> ex);
    }

    @PostMapping("")
    @PreAuthorize(
            "hasAnyAuthority("
                    + "@environment.getProperty('app.serviceaccount.role'),"
                    + "T(md.utm.farmbot.backend.Permissions).ADMIN"
                    + ")"
    )
    public EventsDTO create(
            @Valid @RequestBody EventsDTO payload
    ) {
        return
                service
                        .create(converter.toEvent(payload))
                        .map(converter::toEventDTO)
                        .getOrElseThrow(ex -> ex);
    }

    @PutMapping("/{id}")
    @PreAuthorize(
            "hasAnyAuthority("
                    + "@environment.getProperty('app.serviceaccount.role'),"
                    + "T(md.utm.farmbot.backend.Permissions).ADMIN"
                    + ")"
    )
    public EventsDTO update(
            @PathVariable("id") Long id,
            @Valid @RequestBody EventsDTO payload
    ) {
        return
                service
                        .update(id, converter.toEvent(payload))
                        .map(converter::toEventDTO)
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
