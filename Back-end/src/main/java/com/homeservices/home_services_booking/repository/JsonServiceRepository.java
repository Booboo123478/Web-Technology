package com.homeservices.home_services_booking.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homeservices.home_services_booking.model.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JsonServiceRepository {
    private final String filePath;
    private final ObjectMapper mapper;
    private List<Service> services;

    public JsonServiceRepository(@Value("${app.services.file}") String filePath) {
        this.filePath = filePath;
        this.mapper = new ObjectMapper();
        this.services = loadFromFile();
    }

    private List<Service> loadFromFile() {
        try {
            File file = new File(filePath);
            if (!file.exists() || file.length() == 0) {
                return new ArrayList<>();
            }
            return mapper.readValue(file, new TypeReference<List<Service>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void saveToFile() {
        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(new File(filePath), services);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Service> findAll() {
        return new ArrayList<>(services);
    }

    public Service findById(long id) {
        return services.stream()
                .filter(s -> s.getIdService() != null && s.getIdService() == id)
                .findFirst()
                .orElse(null);
    }

    public Service save(Service service) {
        if(service.getIdService()==null){
            service.setIdService(getMaxId()+1);
        }
        services.removeIf(s -> s.getIdService()!=null && s.getIdService().equals(service.getIdService()));
        services.add(service);
        saveToFile();
        return service;
    }

    public long getMaxId() {
        return services.stream()
                .filter(s -> s.getIdService() != null)
                .mapToLong(Service::getIdService)
                .max()
                .orElse(0L);
    }
} 