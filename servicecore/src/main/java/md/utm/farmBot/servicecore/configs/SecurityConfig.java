package md.utm.farmBot.servicecore.configs;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmBot.servicecore.configs.security.JwtAuthenticationFilter;
import md.utm.farmBot.servicecore.configs.security.SecurityPermitOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.CollectionUtils;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
@AllArgsConstructor
@Slf4j
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private static final int LOG_ROUNDS = 12;

    private final SecurityPermitOptions permitOptions;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .cors().and().csrf().disable()
                .formLogin().disable()
                .authorizeRequests()
                .mvcMatchers(HttpMethod.HEAD, "/actuator/**").permitAll()
                .mvcMatchers(HttpMethod.GET, "/actuator/**").permitAll();

        log.debug("Defined permit options: {}", permitOptions.getPermit());
        if (!CollectionUtils.isEmpty(permitOptions.getPermit())) {
            permitOptions.getPermit().forEach(option -> {
                try {
                    http.authorizeRequests().mvcMatchers(
                            HttpMethod.resolve(option.getMethod()), option.getUrl()
                    ).permitAll();
                } catch (Exception e) {
                    log.error(e.getMessage(), e);
                }
            });
        }

        http.authorizeRequests().anyRequest().authenticated();
        http.exceptionHandling().authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.FORBIDDEN));
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder(LOG_ROUNDS);
    }
}
