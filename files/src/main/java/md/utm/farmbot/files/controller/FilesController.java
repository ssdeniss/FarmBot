package md.utm.farmbot.files.controller;

import io.jsonwebtoken.lang.Collections;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import md.utm.farmBot.servicecore.exceptions.BadRequestException;
import md.utm.farmBot.servicecore.exceptions.DataNotFoundException;
import md.utm.farmbot.files.dtos.Base64FileDto;
import md.utm.farmbot.files.model.File;
import md.utm.farmbot.files.service.FilesService;
import md.utm.farmbot.files.utils.FileUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1")
public class FilesController {
    private final FilesService filesService;

    @GetMapping(value = "/{ids}", params = {"!download"})
    @PreAuthorize("hasAnyAuthority( " +
            "@environment.getProperty('app.serviceaccount.role')," +
            "'ADMIN')")
    public Object getFilesById(@PathVariable("ids") String ids) throws DataNotFoundException, BadRequestException {
        var idsLong = FileUtils.stringToLongList(ids);

        List<File> files = filesService.findByIds(idsLong.stream().collect(Collectors.toList()));
        return idsLong.size() == 1 ? Optional.ofNullable(files.get(0)).orElseThrow(DataNotFoundException::new) : files;
    }

    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyAuthority( " +
            "@environment.getProperty('app.serviceaccount.role')," +
            "'ADMIN')")
    public List<File> uploadFiles(@RequestParam("files") MultipartFile[] multipartFiles) {
        if (multipartFiles.length == 0) {
            throw new BadRequestException("No files uploaded");
        }
        return Arrays.stream(multipartFiles).map(filesService::store).collect(Collectors.toList());
    }


    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority( " +
            "@environment.getProperty('app.serviceaccount.role')," +
            "'ADMIN')")
    public List<File> uploadFiles(@RequestBody List<Base64FileDto> files) {
        if (Collections.isEmpty(files)) {
            throw new BadRequestException("No files uploaded");
        }
        return files.stream()
                .map(file -> filesService.store(file.getName(), file.getMimetype(), Base64.getDecoder().decode(file.getContent()), file.getPath()))
                .collect(Collectors.toList());
    }

    @DeleteMapping(value = "/{ids}")
    @PreAuthorize("hasAnyAuthority( " +
            "@environment.getProperty('app.serviceaccount.role')," +
            "'ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public void removeFiles(@PathVariable("ids") String ids) {
        filesService.remove(FileUtils.stringToLongList(ids));
    }

}
