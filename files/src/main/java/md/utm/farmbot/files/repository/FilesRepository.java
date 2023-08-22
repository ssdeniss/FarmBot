package md.utm.farmbot.files.repository;

import md.utm.farmbot.files.model.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FilesRepository extends JpaRepository<File, Long> {

    @Query("SELECT f FROM File f WHERE f.id IN :ids")
    List<File> findActiveById(List<Long> ids);
}