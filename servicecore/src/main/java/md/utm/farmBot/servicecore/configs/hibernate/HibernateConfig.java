package md.utm.farmBot.servicecore.configs.hibernate;

import com.zaxxer.hikari.HikariDataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;
import net.kaczmarzyk.spring.data.jpa.web.SpecificationArgumentResolver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@ConditionalOnProperty({"app.model.package"})
@EnableTransactionManagement
@EnableAutoConfiguration
public class HibernateConfig implements WebMvcConfigurer {
    private final JpaProperties jpaProperties;
    private final AbstractApplicationContext applicationContext;
    @Value("${app.model.package}")
    private String modelPackage;

    @Bean
    public JpaVendorAdapter jpaVendorAdapter() {
        return new HibernateJpaVendorAdapter();
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {
        Map<String, Object> properties = new HashMap(this.jpaProperties.getProperties());
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan(new String[]{this.modelPackage});
        em.setJpaVendorAdapter(this.jpaVendorAdapter());
        em.setJpaPropertyMap(properties);
        return em;
    }

    @Primary
    @Bean(
            destroyMethod = "close"
    )
    public HikariDataSource dataSource(DataSourceProperties properties) {
        return (HikariDataSource)properties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
    }

    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new SpecificationArgumentResolver(this.applicationContext));
    }

    public HibernateConfig(final JpaProperties jpaProperties, final AbstractApplicationContext applicationContext) {
        this.jpaProperties = jpaProperties;
        this.applicationContext = applicationContext;
    }
}
