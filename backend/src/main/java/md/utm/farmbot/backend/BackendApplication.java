package md.utm.farmbot.backend;

import md.utm.farmBot.servicecore.ServiceCoreModule;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@Configuration
@SpringBootApplication(
        scanBasePackageClasses = {
                ServiceCoreModule.class,
                BackendApplication.class
        }
)
@EnableJpaRepositories({"md.utm.farmbot.backend.repositories"})
@EnableFeignClients("md.utm.farmbot.backend.clients")
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
}
