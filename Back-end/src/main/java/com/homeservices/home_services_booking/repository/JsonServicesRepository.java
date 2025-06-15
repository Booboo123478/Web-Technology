package com.homeservices.home_services_booking.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homeservices.home_services_booking.model.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.DeleteMapping;

public class JsonServicesRepository {

    private final File jsonFile;
    private final ObjectMapper objectMapper;
    private List<Service> services;

    public JsonServicesRepository(String filePath) {
        this.jsonFile = new File(filePath);
        this.objectMapper = new ObjectMapper();
        this.services = loadServicesFromFile();
    }

    private List<Service> loadServicesFromFile() {
        if (!jsonFile.exists()) {
            return new ArrayList<>();
        }
        try {
            return objectMapper.readValue(jsonFile, new TypeReference<List<Service>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void saveServicesToFile() {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(jsonFile, services);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Service> findAll() {
        return services;
    }

    public Optional<Service> findByIdService(Long idService) {
        return services.stream()
                .filter(u -> java.util.Objects.equals(u.getIdService(), idService))
                .findFirst();
    }

    public Service save(Service service) {
        findByIdService(service.getIdService()).ifPresent(services::remove);
        services.add(service);
        saveServicesToFile();
        return service;
    }

    @DeleteMapping("/services/{id}")
    public void delete(Long idService) {
        services.removeIf(u -> java.util.Objects.equals(u.getIdService(), idService));
        saveServicesToFile();
    }

    public List<Service> findByPrestataireId(Long idPrestataire) {
        return findAll().stream()
            .filter(s -> s.getIdPrestataire().equals(idPrestataire))
            .collect(Collectors.toList());
    }

    public long getMaxId() {
        return services.stream()
                .map(Service::getIdService)
                .filter(java.util.Objects::nonNull)
                .max(Long::compareTo)
                .orElse(0L);
    }
}
