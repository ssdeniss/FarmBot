package md.utm.farmbot.backend.repositories;

import md.utm.farmbot.backend.models.Zones;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ZonesRepository extends JpaRepository<Zones, Long>, JpaSpecificationExecutor<Zones> {
}
