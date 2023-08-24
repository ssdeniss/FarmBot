package md.utm.farmbot.backend.repositories;

import md.utm.farmbot.backend.models.AppParameters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface AppParametersRepository extends JpaRepository<AppParameters, Long>, JpaSpecificationExecutor<AppParameters> {

}