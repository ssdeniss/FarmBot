package md.utm.farmbot.backend.services;

import io.vavr.control.Either;
import lombok.RequiredArgsConstructor;
import md.utm.farmBot.servicecore.exceptions.DataNotFoundException;
import md.utm.farmBot.servicecore.exceptions.PlatformException;
import md.utm.farmBot.servicecore.utils.ExceptionUtils;
import md.utm.farmbot.backend.models.Plants;
import md.utm.farmbot.backend.repositories.PlantsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlantsService {

    private final PlantsRepository repository;

    public Page<Plants> search(Specification<Plants> spec, Pageable page) {
        return repository.findAll(spec, page);
    }

    public Either<PlatformException, Plants> findById(Long id) {
        return repository.findById(id)
                .map(Either::<PlatformException, Plants>right)
                .orElseGet(() -> Either.left(
                                new DataNotFoundException("errors.md.utm.farm_bot.plants.plant.not-found " + id)
                        )
                );
    }

    public Either<PlatformException, Plants> create(Plants entity) {
        return Either.<PlatformException, Plants>right(entity)
                .flatMap(type -> ExceptionUtils.trial(() -> repository.save(type)));
    }

    public Either<PlatformException, Plants> update(Long id, Plants changeset) {
        return
                findById(id)
                        .map(persisted ->
                                persisted
                                        .setName(changeset.getName())
                                        .setDescription(changeset.getDescription())
                                        .setHumidityMin(changeset.getHumidityMin())
                                        .setHumidityMax(changeset.getHumidityMax())
                                        .setTemperatureMin(changeset.getTemperatureMin())
                                        .setTemperatureMax(changeset.getTemperatureMax())
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
