package md.utm.farmbot.files.service;

import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmBot.servicecore.exceptions.DataNotFoundException;
import md.utm.farmbot.files.repository.FilesRepository;
import md.utm.farmbot.files.utils.Consume;
import md.utm.farmbot.files.model.File;
import org.apache.commons.lang3.StringUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
@Slf4j
@RequiredArgsConstructor
public class FilesService {
    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd").withZone(ZoneOffset.UTC);

    private final FilesRepository filesRepository;

    @Value("${app.store}")
    private String storeFolder;

    @SneakyThrows
    private md.utm.farmbot.files.model.File uploadFileToStore(MultipartFile file) {
        return uploadFileToStore(
                file.getOriginalFilename(),
                file.getContentType(),
                file.getSize(),
                file.getInputStream(),
                null
        );
    }

    @SneakyThrows
    private md.utm.farmbot.files.model.File uploadFileToStore(String fileName, String mimeType, byte[] content, String path) {
        return uploadFileToStore(fileName, mimeType, (long) content.length, new ByteArrayInputStream(content), path);
    }

    @SneakyThrows
    private md.utm.farmbot.files.model.File uploadFileToStore(String fileName, String mimeType, Long size, InputStream stream, String path) {
        var now = Instant.now();
        var filePath = (path!= null ? path : StringUtils.defaultString(dateTimeFormatter.format(now), ".")) + "/" + UUID.randomUUID().toString();
        var ref = Path.of(
                StringUtils.defaultString(storeFolder, "."),
                filePath
        );
        ref.toFile().getParentFile().mkdirs();
        ref.toFile().createNewFile();

        Files.copy(
                stream,
                ref,
                StandardCopyOption.REPLACE_EXISTING
        );

        return new md.utm.farmbot.files.model.File(
                null,
                fileName,
                mimeType,
                Timestamp.from(now),
                size,
                filePath,
                false, false
        );
    }


    @Transactional
    public md.utm.farmbot.files.model.File store(MultipartFile multipartFile) {
        return Optional.ofNullable(Consume.exception(() -> uploadFileToStore(multipartFile), null))
                .map(filesRepository::save)
                .orElse(null);
    }

    @Transactional
    public md.utm.farmbot.files.model.File store(String fileName, String mimeType, byte[] content, String path) {
        return Optional.ofNullable(Consume.exception(() -> uploadFileToStore(fileName, mimeType, content, path), null))
                .map(filesRepository::save)
                .orElse(null);
    }

    public List<md.utm.farmbot.files.model.File> findByIds(List<Long> ids) {
        return filesRepository.findActiveById(ids);
    }

    private InputStream getFileStream(md.utm.farmbot.files.model.File file) throws FileNotFoundException {
        return new FileInputStream(
                Path.of(
                        StringUtils.defaultString(storeFolder, "."),
                        file.getStorePath()
                ).toFile()
        );
    }

    public DownloadableFile downloadFiles(List<Long> ids) throws IOException {
        var files = filesRepository.findActiveById(ids);

        if (ids.size() != files.size()) {
            throw new DataNotFoundException("Some provided file ids are missing");
        }

        if (files.size() == 1) {
            var file = files.get(0);
            var inputStream = getFileStream(file);
            var downloadableEntity = DownloadableFile.builder()
                    .name(file.getName())
                    .size(file.getSize())
                    .contentType(file.getContentType())
                    .content(org.apache.commons.io.IOUtils.toByteArray(inputStream))
                    .build();
            inputStream.close();
            return downloadableEntity;
        }

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(byteArrayOutputStream);

        final ZipOutputStream zipOutputStream = new ZipOutputStream(bufferedOutputStream);
        files.forEach(file -> {
            try {
                zipOutputStream.putNextEntry(new ZipEntry(file.getName()));

                var inputStream = getFileStream(file);
                IOUtils.copy(inputStream, zipOutputStream);
                inputStream.close();

                zipOutputStream.closeEntry();
            } catch (IOException ex) {
                log.error(ex.getMessage(), ex);
            }
        });
        zipOutputStream.finish();
        zipOutputStream.flush();

        return DownloadableFile.builder()
                .name("archive.zip")
                .size((long) byteArrayOutputStream.size())
                .contentType("application/zip")
                .content(byteArrayOutputStream.toByteArray())
                .build();
    }

    @Transactional
    public void remove(List<Long> ids) {
        filesRepository.markAsDelete(ids);
    }

    @Builder
    @lombok.Value
    public static class DownloadableFile {
        String name;
        Long size;
        String contentType;
        byte[] content;
    }

    @SneakyThrows
    public Long signFile(Long id, byte[] content){
        md.utm.farmbot.files.model.File file = filesRepository.findById(id).orElseThrow(FileNotFoundException::new);
        File uploadedFile = Optional.ofNullable(Consume.exception(() -> uploadFileToStore(file.getName(), file.getContentType(), content, null), null)).orElse(null);;
        file.setStorePath(uploadedFile.getStorePath());
        file.setUploadDate(uploadedFile.getUploadDate());
        file.setSize(uploadedFile.getSize());
        file.setSigned(true);
        return filesRepository.save(file).getId();

    }

}
