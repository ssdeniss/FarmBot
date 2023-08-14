package md.utm.farmBot.servicecore.configs.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@EnableConfigurationProperties
@ConfigurationProperties(prefix = "app.security")
public class SecurityPermitOptions {

    @Getter
    @Setter
    public List<SecurityPermitOption> permit;
}
