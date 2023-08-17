package md.utm.farmbot.backend.repositories;

import md.utm.farmbot.backend.models.Plants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantsRepository extends JpaRepository<Plants, Long>, JpaSpecificationExecutor<Plants> {
}
