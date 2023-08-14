package md.utm.farmBot.servicecore.configs.feign;

import feign.Logger;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.cloud.openfeign.hateoas.FeignHalAutoConfiguration;

@Configuration
@EnableAutoConfiguration(
        exclude = {FeignHalAutoConfiguration.class}
)
@EnableFeignClients
public class FeignConfig {
    public FeignConfig() {
    }

    @Bean
    public FeignErrorDecoder errorDecoder() {
        return new FeignErrorDecoder();
    }

    @Bean
    Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }
}
