package md.utm.farmbot.files.repository;

import md.utm.farmbot.files.model.QRTempValues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface QRTempValuesRepository extends JpaRepository<QRTempValues, Long>, JpaSpecificationExecutor<QRTempValues> {
    Optional<QRTempValues> findByUuid(String uuid);
}