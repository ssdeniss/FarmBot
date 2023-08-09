package md.utm.farmbot.auth.clients;

import md.utm.farmbot.auth.dtos.AuthenticatedUserDTO;
import md.utm.farmbot.auth.dtos.UsernamePasswordCredentialsDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;


@FeignClient(name = "backend", url = "${services.backend.host}")
public interface BackendClient {

    @PostMapping("${services.backend.endpoints.authenticate}")
    AuthenticatedUserDTO authenticate(
            UsernamePasswordCredentialsDTO credentials,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken
    );
}
