package md.utm.farmbot.hardware.clients;

import org.springframework.cloud.openfeign.FeignClient;


@FeignClient(name = "backend", url = "${services.backend.host}")
public interface BackendClient {

}
