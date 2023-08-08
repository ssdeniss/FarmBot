package md.customs.frontiera.gateway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.gateway.filter.factory.PreserveHostHeaderGatewayFilterFactory;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;

import md.customs.frontiera.gateway.configs.TokenFilterFactory;

import java.io.IOException;
import java.io.StringReader;
import java.util.Properties;

@SpringBootApplication
@EnableFeignClients
public class GatewayApplication {
    private static final Logger LOGGER = LoggerFactory.getLogger(GatewayApplication.class);

    @Value("${app.gateway.services}")
    private String gatewayServices;

    private TokenFilterFactory tokenFilterFactory;

    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }

    @Bean
    public HttpMessageConverters getMessageConverters() {
        return new HttpMessageConverters();
    }

    @Bean
    feign.Logger.Level feignLoggerLevel() {
        return feign.Logger.Level.FULL;
    }

    @Bean
    public Properties gatewayServicesProperties() throws IOException {
        var properties = new Properties();
        properties.load(new StringReader(gatewayServices.replace(";", "\n")));
        return properties;
    }

    @Lazy
    @Autowired
    private void setAuthenticationClient(
            TokenFilterFactory tokenFilterFactory
    ) {
        this.tokenFilterFactory = tokenFilterFactory;
    }

    @Bean
    public RouteLocator gatewayRouteLocator(RouteLocatorBuilder routeLocatorBuilder) {
        var builder = routeLocatorBuilder.routes();

        LOGGER.info("Configuring routes from string: {}", gatewayServices);
        try {
            var props = gatewayServicesProperties();

            for (Object key : props.keySet()) {
                var serviceName = key.toString();
                var serviceUrl = props.getProperty(serviceName);

                builder = builder.route(p -> p
                        .path("/" + serviceName + "/**")
                        .filters(f -> f
                                .filter(tokenFilterFactory.apply(new TokenFilterFactory.Config()))
                                .rewritePath("/" + serviceName + "/(?<segment>.*)", "/$\\{segment}"))
                        .uri(serviceUrl));
            }
        } catch (IOException e) {
            // Do nothing
        }

        return builder.build();
    }
}
