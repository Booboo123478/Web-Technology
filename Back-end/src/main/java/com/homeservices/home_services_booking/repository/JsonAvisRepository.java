package com.homeservices.home_services_booking.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homeservices.home_services_booking.model.Avis;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class JsonAvisRepository {

    private final File jsonFile;
    private final ObjectMapper objectMapper;
    private List<Avis> listAvis;

    public JsonAvisRepository(String filePath) {
        this.jsonFile = new File(filePath);
        this.objectMapper = new ObjectMapper();
        this.listAvis = loadAvisFromFile();
    }

    private List<Avis> loadAvisFromFile() {
        if (!jsonFile.exists()) {
            return new ArrayList<>();
        }
        try {
            return objectMapper.readValue(jsonFile, new TypeReference<List<Avis>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void saveAvisToFile() {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(jsonFile, listAvis);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Avis> findAll() {
        return listAvis;
    }

    public Optional<Avis> findByIdAvis(Long idAvis) {
        return listAvis.stream()
                .filter(u -> u.getIdAvis().equals(idAvis))
                .findFirst();
    }

    public Avis save(Avis avis) {
        findByIdAvis(avis.getIdAvis()).ifPresent(listAvis::remove);
        listAvis.add(avis);
        saveAvisToFile();
        return avis;
    }

    public void delete(Long idAvis) {
        listAvis.removeIf(u -> u.getIdAvis().equals(idAvis));
        saveAvisToFile();
    }
}
