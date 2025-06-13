package com.homeservices.home_services_booking.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;


@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000",
            "https://corta-web-tech.ordredumalt.com")
            .allowedMethods("GET", "POST")
            .allowCredentials(true);
    }
}
