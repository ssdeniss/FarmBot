package md.utm.farmbot.files;

import md.utm.farmBot.servicecore.ServiceCoreModule;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
        scanBasePackageClasses = {
                FilesApplication.class,
                ServiceCoreModule.class
        })
public class FilesApplication {
    public static void main(String[] args) {
        SpringApplication.run(FilesApplication.class, args);
    }

}
