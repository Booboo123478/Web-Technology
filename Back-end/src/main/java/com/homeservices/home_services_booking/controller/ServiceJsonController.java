package com.homeservices.home_services_booking.controller;

import com.homeservices.home_services_booking.model.Service;
import com.homeservices.home_services_booking.repository.JsonServiceRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceJsonController {

    private final JsonServiceRepository serviceRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Value("${app.image.dir:data/image}")
    private String imagesDir;

    public ServiceJsonController(JsonServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @GetMapping
    public List<Service> getAll() {
        return serviceRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable long id) {
        Service s = serviceRepository.findById(id);
        if (s == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(s);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createService(@RequestPart("service") String serviceJson,
                                           @RequestPart(value = "offreImage", required = false) MultipartFile file) {
        try {
            Service service = objectMapper.readValue(serviceJson, Service.class);
            long newId = serviceRepository.getMaxId() + 1;
            service.setIdService(newId);

            if (file != null && !file.isEmpty()) {
                String filename = "service_" + newId + "_" + file.getOriginalFilename();
                java.nio.file.Path dirPath = java.nio.file.Paths.get(imagesDir);
                if(!dirPath.isAbsolute()){
                    dirPath = java.nio.file.Paths.get("").toAbsolutePath().resolve(dirPath);
                }
                java.nio.file.Files.createDirectories(dirPath);
                java.nio.file.Path target = dirPath.resolve(filename);
                file.transferTo(target.toFile());
                service.setOffreImageUrl(filename);
            }

            Service saved = serviceRepository.save(service);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Données de service invalides");
        }
    }
} 