package com.homeservices.home_services_booking.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.homeservices.home_services_booking.model.Avis;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class JsonAvisRepository {

    private final String filePath;
    private final ObjectMapper objectMapper;
    private List<Avis> avisList;

    public JsonAvisRepository(@Value("${app.avis.file}") String filePath) {
        this.filePath = filePath;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
        this.avisList = loadAvisFromFile();
    }

    private List<Avis> loadAvisFromFile() {
        try {
            File file = new File(filePath);
            if (!file.exists() || file.length() == 0) {
                return new ArrayList<>();
            }
            return objectMapper.readValue(file, new TypeReference<List<Avis>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void saveAvisToFile() {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(filePath), avisList);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Avis> findAll() {
        return new ArrayList<>(avisList);
    }
    
    public List<Avis> findByPrestataireId(long prestataireId) {
        return avisList.stream()
                .filter(avis -> avis.getIdPrestataire() == prestataireId)
                .collect(Collectors.toList());
    }

    public Avis save(Avis avis) {
        avis.setIdAvis(getMaxId() + 1);
        avisList.add(avis);
        saveAvisToFile();
        return avis;
    }

    public long getMaxId() {
        return avisList.stream()
                .mapToLong(Avis::getIdAvis)
                .max()
                .orElse(0L);
    }
}
