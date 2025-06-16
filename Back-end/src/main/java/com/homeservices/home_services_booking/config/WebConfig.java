package com.homeservices.home_services_booking.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.image.dir:data/image}")
    private String imagesDir;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000",
            "https://corta-web-tech.ordredumalt.com")
            .allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE")
            .allowCredentials(true);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String location = "file:" + (imagesDir.endsWith("/") ? imagesDir : imagesDir + "/");
        registry.addResourceHandler("/image/**")
                .addResourceLocations(location);
    }
}
