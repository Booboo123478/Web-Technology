package com.homeservices.home_services_booking.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homeservices.home_services_booking.model.Paiement;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class JsonPaiementsRepository {

    private final File jsonFile;
    private final ObjectMapper objectMapper;
    private List<Paiement> paiements;

    public JsonPaiementsRepository(String filePath) {
        this.jsonFile = new File(filePath);
        this.objectMapper = new ObjectMapper();
        this.paiements = loadPaiementsFromFile();
    }

    private List<Paiement> loadPaiementsFromFile() {
        if (!jsonFile.exists()) {
            return new ArrayList<>();
        }
        try {
            return objectMapper.readValue(jsonFile, new TypeReference<List<Paiement>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void savePaiementsToFile() {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(jsonFile, paiements);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Paiement> findAll() {
        return paiements;
    }

    public Optional<Paiement> findByIdPaiement(Long idPaiement) {
        return paiements.stream()
                .filter(u -> u.getIdPaiement().equals(idPaiement))
                .findFirst();
    }

    public Paiement save(Paiement paiement) {
        findByIdPaiement(paiement.getIdPaiement()).ifPresent(paiements::remove);
        paiements.add(paiement);
        savePaiementsToFile();
        return paiement;
    }

    public void delete(Long idPaiement) {
        paiements.removeIf(u -> u.getIdPaiement().equals(idPaiement));
        savePaiementsToFile();
    }
}
