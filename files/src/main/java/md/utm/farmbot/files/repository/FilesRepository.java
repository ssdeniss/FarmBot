package md.utm.farmbot.files.repository;

import md.utm.farmbot.files.model.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FilesRepository extends JpaRepository<File, Long> {

    @Modifying
    @Query("UPDATE File f SET f.deleted = 1 WHERE f.id IN :ids")
    void markAsDelete(List<Long> ids);

    @Query("SELECT f FROM File f WHERE f.id IN :ids AND f.deleted = false")
    List<File> findActiveById(List<Long> ids);
}