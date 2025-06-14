package com.homeservices.home_services_booking.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homeservices.home_services_booking.model.Prestataire;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class JsonPrestatairesRepository {

    private final File file;
    private final ObjectMapper mapper;

    public JsonPrestatairesRepository(String filePath) {
        this.file = new File(filePath);
        this.mapper = new ObjectMapper();
        if (!file.exists()) {
            try {
                mapper.writeValue(file, new ArrayList<Prestataire>());
            } catch (IOException e) {
                throw new RuntimeException("Impossible d'initialiser le fichier prestataires", e);
            }
        }
    }

    public List<Prestataire> findAll() {
        try {
            return mapper.readValue(file, new TypeReference<List<Prestataire>>() {});
        } catch (IOException e) {
            throw new RuntimeException("Erreur de lecture du fichier prestataires", e);
        }
    }

    public Prestataire save(Prestataire prestataire) {
        List<Prestataire> prestataires = findAll();
        prestataires.removeIf(p -> p.getIdPrestataire().equals(prestataire.getIdPrestataire()));
        prestataires.add(prestataire);
        try {
            mapper.writeValue(file, prestataires);
        } catch (IOException e) {
            throw new RuntimeException("Erreur d'écriture dans le fichier prestataires", e);
        }
        return prestataire;
    }

    public Prestataire findById(Long id) {
        return findAll().stream()
                .filter(p -> p.getIdPrestataire().equals(id))
                .findFirst()
                .orElse(null);
    }

    public long getMaxId() {
        return findAll().stream()
                .mapToLong(Prestataire::getIdPrestataire)
                .max()
                .orElse(0);
    }
}
