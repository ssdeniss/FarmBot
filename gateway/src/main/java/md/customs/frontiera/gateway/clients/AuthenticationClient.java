package md.customs.frontiera.gateway.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "authentication", url = "${services.auth.host}")
public interface AuthenticationClient {
    @GetMapping(value = "v1/token/{reference}")
    String referenceToValue(
            @PathVariable("reference") String reference,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken
    );
}
