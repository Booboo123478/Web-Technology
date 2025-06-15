package com.homeservices.home_services_booking.controller;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.homeservices.home_services_booking.model.Service;
import com.homeservices.home_services_booking.repository.JsonServicesRepository;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final JsonServicesRepository repository;

    public ServiceController(@Value("${app.services.file}") String servicesFilePath) {
        System.out.println("ServiceController créé avec servicesFilePath=" + servicesFilePath);
        this.repository = new JsonServicesRepository(servicesFilePath);
            }

    @GetMapping
    public List<Service> getAll() {
        return repository.findAll();
    }

    @GetMapping("/prestataire/{idPrestataire}")
    public List<Service> getByPrestataire(@PathVariable Long idPrestataire) {
        return repository.findByPrestataireId(idPrestataire);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Service> createService(
        @RequestPart("service") String serviceJson,
        @RequestPart(value = "offreImage", required = false) MultipartFile offreImage
    ) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Service service = mapper.readValue(serviceJson, Service.class);

            if (offreImage != null && !offreImage.isEmpty()) {
            String filename = UUID.randomUUID() + "_" + Path.of(offreImage.getOriginalFilename()).getFileName();

            String imagesDir2 = "../front-end/public/image";

            File dossier = new File(imagesDir2);
            File dossierAbsolu = dossier.getAbsoluteFile();

            if (!dossierAbsolu.exists()) {
                boolean created = dossierAbsolu.mkdirs();
                if (!created) {
                    throw new IOException("Impossible de créer le dossier : " + dossierAbsolu.getAbsolutePath());
                }
            }

            File fichierImage = new File(dossierAbsolu, filename);

            offreImage.transferTo(fichierImage);

            service.setOffreImageUrl(filename);
        }            
            long newId = repository.getMaxId() + 1;
            service.setIdService(newId);

            Service saved = repository.save(service);

            URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getIdService())
                .toUri();

            return ResponseEntity.created(location).body(saved);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerService(@PathVariable Long id) {
        try {
            repository.delete(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(@PathVariable Long id) {
        Optional<Service> serviceOpt = repository.findByIdService(id);
        if (serviceOpt.isPresent()) {
            return ResponseEntity.ok(serviceOpt.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
