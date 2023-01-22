package com.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@Component
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // super.configure(http);
        http.csrf().disable();
        http.authorizeRequests()
                .antMatchers("/users/**")
                .authenticated()
                .and()
                .formLogin().and()
                        .httpBasic();
        // http.cors().disable();
        // http
        // .authorizeRequests()
        // .antMatchers(HttpMethod.OPTIONS).hasAnyRole("ADMIN","USER")
        // .antMatchers("/admin/**").hasRole("ADMIN")
        // .antMatchers("/api/**").hasAnyRole("ADMIN","USER")
        // .antMatchers("/users/**").hasAnyRole("ADMIN","USER")
        //         .antMatchers("/").permitAll()
        //         .and()
        //         .formLogin().and()
        //         .httpBasic();
                        // .antMatchers("/api/**").hasAnyRole("ADMIN","USER")
			// .and()
                // .csrf().disable();
                // .formLogin();
                // .permitAll()
                // .and().logout().permitAll();
       

        // http.csrf().
        // disable()
        //     .authorizeRequests()
        //     .antMatchers(HttpMethod.OPTIONS, "/**")
        //     .permitAll()
        //     .anyRequest()
        //     .authenticated()
        //     .and()
        //     .httpBasic();
    }
   

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
    }
    
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

	
	// @Autowired
    // public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    //     auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	// }
	
	@Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        auth.inMemoryAuthentication()
                .withUser("user@test.com").password("password").roles("USER")
                .and()
                .withUser("admin@test.com").password("password").roles("ADMIN", "ADMIN");
    }

}
