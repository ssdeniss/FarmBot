package md.utm.farmbot.auth;

import md.utm.farmBot.servicecore.ServiceCoreModule;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@SpringBootApplication(
        scanBasePackageClasses = {
                ServiceCoreModule.class,
                AuthApplication.class
        }
)
@EnableFeignClients("md.utm.farmbot.auth.clients")
public class AuthApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthApplication.class, args);
    }

}

