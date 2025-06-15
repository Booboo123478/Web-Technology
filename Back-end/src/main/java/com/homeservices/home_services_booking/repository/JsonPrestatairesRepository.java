package com.homeservices.home_services_booking.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homeservices.home_services_booking.model.Prestataire;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JsonPrestatairesRepository {

    private final String filePath;
    private final ObjectMapper mapper;
    private List<Prestataire> prestataires;

    public JsonPrestatairesRepository(@Value("${app.prestataires.file}") String filePath) {
        this.filePath = filePath;
        this.mapper = new ObjectMapper();
        this.prestataires = loadFromFile();
    }

    private List<Prestataire> loadFromFile() {
        try {
            File file = new File(filePath);
            if (!file.exists() || file.length() == 0) {
                return new ArrayList<>();
            }
            return mapper.readValue(file, new TypeReference<List<Prestataire>>() {});
        } catch (IOException e) {
            throw new RuntimeException("Erreur de lecture du fichier prestataires", e);
        }
    }

    private void saveToFile() {
        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(new File(filePath), prestataires);
        } catch (IOException e) {
            throw new RuntimeException("Erreur d'écriture dans le fichier prestataires", e);
        }
    }

    public List<Prestataire> findAll() {
        return new ArrayList<>(prestataires);
    }

    public Prestataire save(Prestataire prestataire) {
        prestataires.removeIf(p ->
            p.getIdPrestataire() != null &&
            p.getIdPrestataire().equals(prestataire.getIdPrestataire())
        );
        prestataires.add(prestataire);
        saveToFile();
        return prestataire;
    }

    public Prestataire findById(Long id) {
        return prestataires.stream()
                .filter(p -> p.getIdPrestataire().equals(id))
                .findFirst()
                .orElse(null);
    }

    public long getMaxId() {
        return prestataires.stream()
                .mapToLong(Prestataire::getIdPrestataire)
                .max()
                .orElse(0L);
    }
}
