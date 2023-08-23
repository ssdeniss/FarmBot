package md.utm.farmbot.backend.services;

import io.vavr.control.Either;
import lombok.RequiredArgsConstructor;
import md.utm.farmBot.servicecore.exceptions.DataNotFoundException;
import md.utm.farmBot.servicecore.exceptions.PlatformException;
import md.utm.farmBot.servicecore.utils.ExceptionUtils;
import md.utm.farmbot.backend.models.Zones;
import md.utm.farmbot.backend.repositories.ZonesRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ZonesService {

    private final ZonesRepository repository;

    public List<Zones> findAll() {
        return repository.findAll();
    }

    public Either<PlatformException, Zones> findById(Long id) {
        return repository.findById(id)
                .map(Either::<PlatformException, Zones>right)
                .orElseGet(() -> Either.left(
                                new DataNotFoundException("errors.md.utm.farm_bot.zones.zone.not-found " + id)
                        )
                );
    }

    public Either<PlatformException, Zones> create(Zones entity) {
        return Either.<PlatformException, Zones>right(entity)
                .flatMap(type -> ExceptionUtils.trial(() -> repository.save(type)));
    }

    public Either<PlatformException, Zones> update(Long id, Zones changeset) {
        return
                findById(id)
                        .map(persisted ->
                                persisted
                                        .setAddress(changeset.getAddress())
                                        .setMode(changeset.getMode())
                                        .setPlant(changeset.getPlant())
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
