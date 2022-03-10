package com.haem.esl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.Locale;

@SpringBootApplication
public class EslApplication {

    public static void main(String[] args) {
        SpringApplication.run(EslApplication.class, args);
    }

    @Bean
    public LocaleResolver localeResolver() {
        SessionLocaleResolver sessionLocaleResolver = new SessionLocaleResolver();
        // 아래 값을 수정하여 언어 결정
        sessionLocaleResolver.setDefaultLocale(Locale.KOREA);
        return sessionLocaleResolver;
    }
}

