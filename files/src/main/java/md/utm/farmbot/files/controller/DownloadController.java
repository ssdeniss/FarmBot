package md.utm.farmbot.files.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmBot.servicecore.exceptions.BadRequestException;
import md.utm.farmBot.servicecore.exceptions.DataNotFoundException;
import md.utm.farmbot.files.service.FilesService;
import md.utm.farmbot.files.utils.FileUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1")
public class DownloadController {
    private final FilesService filesService;

    @GetMapping(value = "/{ids}", params = {"download"})
    @PreAuthorize("hasAnyAuthority( " +
            "@environment.getProperty('app.serviceaccount.role')," +
            "'FILES_MANAGEMENT')")
    public ResponseEntity<byte[]> downloadFilesById(@PathVariable("ids") String ids) throws DataNotFoundException, BadRequestException, IOException {
        var idsLong = FileUtils.stringToLongList(ids);

        var downloadableFile = filesService.downloadFiles(idsLong);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + downloadableFile.getName() + "\"");
        headers.add(HttpHeaders.CONTENT_LENGTH, String.valueOf(downloadableFile.getSize()));
        headers.add(HttpHeaders.CONTENT_TYPE, downloadableFile.getContentType());
        return ResponseEntity.ok().headers(headers).body(downloadableFile.getContent());
    }
}
