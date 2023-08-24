package md.utm.farmbot.backend.services;

import io.vavr.control.Either;
import lombok.RequiredArgsConstructor;
import md.utm.farmBot.servicecore.exceptions.DataNotFoundException;
import md.utm.farmBot.servicecore.exceptions.PlatformException;
import md.utm.farmBot.servicecore.utils.ExceptionUtils;
import md.utm.farmbot.backend.models.Events;
import md.utm.farmbot.backend.repositories.EventsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventsService {

    private final EventsRepository repository;

    public Page<Events> search(Specification<Events> spec, Pageable page) {
        return repository.findAll(spec, page);
    }

    public Either<PlatformException, Events> findById(Long id) {
        return repository.findById(id)
                .map(Either::<PlatformException, Events>right)
                .orElseGet(() -> Either.left(
                                new DataNotFoundException("errors.md.utm.farm_bot.events.event.not-found " + id)
                        )
                );
    }

    public Either<PlatformException, Events> create(Events entity) {
        return Either.<PlatformException, Events>right(entity)
                .flatMap(type -> ExceptionUtils.trial(() -> repository.save(type)));
    }

    public Either<PlatformException, Events> update(Long id, Events changeset) {
        return
                findById(id)
                        .map(persisted ->
                                persisted
                                        .setDate(changeset.getDate())
                                        .setTitle(changeset.getTitle())
                                        .setMode(changeset.getMode())
                                        .setZoneId(changeset.getZoneId())
                        )
                        .flatMap(type -> ExceptionUtils.trial(() -> repository.save(type)));
    }

    public Either<PlatformException, Events> markDone(Long id) {
        return
                findById(id)
                        .map(persisted ->
                                persisted
                                        .setIsDone(Boolean.TRUE)
                        )
                        .flatMap(type -> ExceptionUtils.trial(() -> repository.save(type)));
    }

    public Either<PlatformException, ResponseEntity<Void>> delete(Long id) {
        return
                findById(id)
                        .flatMap(type -> ExceptionUtils.trial(() -> {
                            repository.delete(type);
                            return ResponseEntity.ok().build();
                        }));
    }
}
