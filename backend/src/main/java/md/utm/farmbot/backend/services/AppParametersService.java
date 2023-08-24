package md.utm.farmbot.backend.services;

import io.vavr.control.Either;
import lombok.RequiredArgsConstructor;
import md.utm.farmBot.servicecore.exceptions.DataNotFoundException;
import md.utm.farmBot.servicecore.exceptions.PlatformException;
import md.utm.farmBot.servicecore.utils.ExceptionUtils;
import md.utm.farmbot.backend.models.AppParameters;
import md.utm.farmbot.backend.repositories.AppParametersRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppParametersService {

    private final AppParametersRepository repository;

    public Page<AppParameters> search(Specification<AppParameters> spec, Pageable page) {
        return repository.findAll(spec, page);
    }

    public Either<PlatformException, AppParameters> findById(Long id) {
        return repository.findById(id)
                .map(Either::<PlatformException, AppParameters>right)
                .orElseGet(() -> Either.left(
                                new DataNotFoundException("errors.md.utm.farm_bot.taxonomies.app_parameter.not-found " + id)
                        )
                );
    }

    public Either<PlatformException, AppParameters> findByCode(String code) {
        return repository.findByCode(code)
                .map(Either::<PlatformException, AppParameters>right)
                .orElseGet(() -> Either.left(
                                new DataNotFoundException("errors.md.utm.farm_bot.taxonomies.app_parameter.not-found " + code)
                        )
                );
    }

    public Either<PlatformException, AppParameters> create(AppParameters entity) {
        return Either.<PlatformException, AppParameters>right(entity)
                .flatMap(type -> ExceptionUtils.trial(() -> repository.save(type)));
    }

    public Either<PlatformException, AppParameters> update(Long id, AppParameters changeset) {
        return
                findById(id)
                        .map(persisted ->
                                persisted
                                        .setName(changeset.getName())
                                        .setValue(changeset.getValue())
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
