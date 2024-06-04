package md.utm.farmbot.backend.services;

import io.vavr.control.Either;
import lombok.RequiredArgsConstructor;
import md.utm.farmBot.servicecore.exceptions.BadRequestException;
import md.utm.farmBot.servicecore.exceptions.DataNotFoundException;
import md.utm.farmBot.servicecore.exceptions.PlatformException;
import md.utm.farmBot.servicecore.utils.ExceptionUtils;
import md.utm.farmbot.backend.models.Zones;
import md.utm.farmbot.backend.repositories.ZonesRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class ZonesService {

    private final ZonesRepository repository;

    public Page<Zones> findAll(Specification<Zones> spec, Pageable page) {
        return repository.findAll(spec, page);
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
                .flatMap(zone -> ExceptionUtils.trial(() -> {
                    try {
                        return repository.save(zone);
                    } catch (DataIntegrityViolationException ex) {
                        throw new BadRequestException("Zona cu acest indexul de poziționare <" + entity.getAddress() + "> deja există");
                    }
                }));
    }

    public Either<PlatformException, Zones> update(Long id, Zones changeset) {
        return
                findById(id)
                        .map(persisted -> {
                                    setPlantDate(persisted, changeset);
                                    persisted
                                            .setAddress(changeset.getAddress())
                                            .setMode(changeset.getMode())
                                            .setPlant(changeset.getPlant());
                                    return persisted;
                                }
                        )
                        .flatMap(zone -> ExceptionUtils.trial(() -> {
                            try {
                                return repository.save(zone);
                            } catch (DataIntegrityViolationException ex) {
                                throw new BadRequestException("Zona cu acest indexul de poziționare <" + changeset.getAddress() + "> deja există");
                            }
                        }));
    }

    public Either<PlatformException, ResponseEntity<Void>> delete(Long id) {
        return
                findById(id)
                        .flatMap(type -> ExceptionUtils.trial(() -> {
                            repository.delete(type);
                            return ResponseEntity.ok().build();
                        }));
    }


    public void setPlantDate(Zones existent, Zones changeset) {
        if (changeset.getPlant() != null) {
            if (existent.getPlant() == null || !existent.getPlant().getId().equals(changeset.getPlant().getId())) {
                existent.setPlantDate(Instant.now());
            }
        } else {
            existent.setPlantDate(null);
        }
    }
}
