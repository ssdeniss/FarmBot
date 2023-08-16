package md.utm.farmbot.hardware;

import md.utm.farmBot.servicecore.ServiceCoreModule;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@SpringBootApplication(
        scanBasePackageClasses = {
                ServiceCoreModule.class,
                HardwareApplication.class
        }
)
@EnableFeignClients("md.utm.farmbot.hardware.clients")
public class HardwareApplication {

    public static void main(String[] args) {
        SpringApplication.run(HardwareApplication.class, args);
    }

}

