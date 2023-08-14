package md.utm.farmBot.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1/healthcheck")
public class HealthCheck {

    @GetMapping
    public Map<String, String> getHealthCheck() {
        Map<String, String> result = new HashMap<>();

        result.put("gateway", "{\"status\":\"UP\"}");

        return result;
    }
}
