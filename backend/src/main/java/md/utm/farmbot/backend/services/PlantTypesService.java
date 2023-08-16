package md.utm.farmbot.backend.services;

import io.vavr.control.Either;
import lombok.RequiredArgsConstructor;
import md.utm.farmBot.servicecore.exceptions.DataNotFoundException;
import md.utm.farmBot.servicecore.exceptions.PlatformException;
import md.utm.farmBot.servicecore.utils.ExceptionUtils;
import md.utm.farmbot.backend.models.PlantTypes;
import md.utm.farmbot.backend.repositories.PlantTypesRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlantTypesService {

    private final PlantTypesRepository repository;

    public Page<PlantTypes> search(Specification<PlantTypes> spec, Pageable page) {
        return repository.findAll(spec, page);
    }

    public Either<PlatformException, PlantTypes> findById(Long id) {
        return repository.findById(id)
                .map(Either::<PlatformException, PlantTypes>right)
                .orElseGet(() -> Either.left(
                                new DataNotFoundException("errors.md.utm.farm_bot.taxonomies.plant_type.not-found " + id)
                        )
                );
    }

    public Either<PlatformException, PlantTypes> create(PlantTypes entity) {
        return Either.<PlatformException, PlantTypes>right(entity)
                .flatMap(type -> ExceptionUtils.trial(() -> repository.save(type)));
    }

    public Either<PlatformException, PlantTypes> update(Long id, PlantTypes changeset) {
        return
                findById(id)
                        .map(persisted ->
                                persisted
                                        .setName(changeset.getName())
                                        .setDescription(changeset.getDescription())
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
