package com.homeservices.home_services_booking.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homeservices.home_services_booking.model.Prestataire;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class JsonPrestatairesRepository {

    private final File jsonFile;
    private final ObjectMapper objectMapper;
    private List<Prestataire> prestataires;

    public JsonPrestatairesRepository(String filePath) {
        this.jsonFile = new File(filePath);
        this.objectMapper = new ObjectMapper();
        this.prestataires = loadPrestatairesFromFile();
    }

    private List<Prestataire> loadPrestatairesFromFile() {
        if (!jsonFile.exists()) {
            return new ArrayList<>();
        }
        try {
            return objectMapper.readValue(jsonFile, new TypeReference<List<Prestataire>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void savePrestatairesToFile() {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(jsonFile, prestataires);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Prestataire> findAll() {
        return prestataires;
    }

    public Optional<Prestataire> findByIdPrestataire(Long idPrestataire) {
        return prestataires.stream()
                .filter(u -> u.getIdPrestataire().equals(idPrestataire))
                .findFirst();
    }

    public Prestataire save(Prestataire prestataire) {
        findByIdPrestataire(prestataire.getIdPrestataire()).ifPresent(prestataires::remove);
        prestataires.add(prestataire);
        savePrestatairesToFile();
        return prestataire;
    }

    public void delete(Long idPrestataire) {
        prestataires.removeIf(u -> u.getIdPrestataire().equals(idPrestataire));
        savePrestatairesToFile();
    }
}
