/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package javaweb;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;
import java.lang.String;
import java.util.Map;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import org.springframework.stereotype.Component;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.filter.CorsFilter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.FilterChain;
import org.springframework.web.filter.CorsFilter;

import org.springframework.web.filter.GenericFilterBean;
import javax.servlet.Filter;

import java.io.IOException;
import javax.servlet.ServletException;

@Configuration
@EnableWebSecurity
public class Security extends WebSecurityConfigurerAdapter {

	@Component
    public class CustomAuthenticationProvider implements AuthenticationProvider {
     
        @Override
        public Authentication authenticate(Authentication authentication) 
          throws AuthenticationException {
            String name = authentication.getName();
            String password = authentication.getCredentials().toString();
            int value = Database.INSTANCE.login(name,password);
            if(value > 0) {
                return new UsernamePasswordAuthenticationToken(name, password, new ArrayList<>());
            }
            else throw new BadCredentialsException("CANT LOGIN");
        }
     
        @Override
        public boolean supports(Class<?> authentication) {
            return authentication.equals(UsernamePasswordAuthenticationToken.class);
        }
    }

    private CustomAuthenticationProvider authProvider = new CustomAuthenticationProvider();

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http     
            .cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues())
                .and()
            .csrf().disable();
        http
            .authorizeRequests()
                .antMatchers(HttpMethod.POST,"/api/signup").permitAll()
                .antMatchers(HttpMethod.POST,"/api/verify").permitAll()
                .antMatchers(HttpMethod.GET,"/api/**").authenticated()
                .antMatchers(HttpMethod.POST,"/api/**").authenticated()
                .and()
            .logout()
                .logoutUrl("/api/logout")
                .and()
            .httpBasic();
            
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}


