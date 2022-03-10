package com.haem.esl.config;

import com.haem.esl.service.FormAuthenticationProvider;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private  AuthenticationFailureHandler customFailureHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/","/login","/img/**","/error","/favicon.ico","/getProduct*").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/login_proc")
                .failureUrl("/login?error") // default
                .defaultSuccessUrl("/cateLList")
                .usernameParameter("id")
                .passwordParameter("password")
                .failureHandler(customFailureHandler)
                .permitAll();
        http.logout()
                .logoutUrl("/logout") // default
                .logoutSuccessUrl("/login")
                .permitAll();
        http.csrf().disable();//csrf 미적용
    }
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }
    @Bean
    public AuthenticationProvider authenticationProvider() {
        return new FormAuthenticationProvider();
    }
    @Override
    public void configure(WebSecurity web) {
        // /css/**, /images/**, /js/** 등 정적 리소스는 보안필터를 거치지 않게 한다.
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }
}