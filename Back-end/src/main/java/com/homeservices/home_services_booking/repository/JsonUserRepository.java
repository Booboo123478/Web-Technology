package com.homeservices.home_services_booking.repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.homeservices.home_services_booking.model.User;

public class JsonUserRepository {

    private final File jsonFile;
    private final ObjectMapper objectMapper;
    private List<User> users;

    public JsonUserRepository(String filePath) {
        this.jsonFile = new File(filePath);
        System.out.println("Chemin fichier JSON : " + jsonFile.getAbsolutePath());
        this.objectMapper = new ObjectMapper();
        this.users = loadUsersFromFile();
    }

    private List<User> loadUsersFromFile() {
        System.out.println("Tentative de chargement des utilisateurs depuis le fichier...");
        if (!jsonFile.exists()) {
            System.out.println("Le fichier JSON n'existe pas, on retourne une liste vide.");
            return new ArrayList<>();
        }
        try {
            // Enregistre le module JavaTimeModule pour gérer LocalDate
            objectMapper.registerModule(new JavaTimeModule());

            List<User> loadedUsers = objectMapper.readValue(jsonFile, new TypeReference<List<User>>() {});
            System.out.println("Utilisateurs chargés : " + loadedUsers.size());
            return loadedUsers;
        } catch (IOException e) {
            System.out.println("Erreur lors de la lecture du fichier JSON : " + e.getMessage());
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void saveUsersToFile() {
        System.out.println("Sauvegarde des utilisateurs dans le fichier JSON...");
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(jsonFile, users);
            System.out.println("Sauvegarde réussie.");
        } catch (IOException e) {
            System.out.println("Erreur lors de la sauvegarde du fichier JSON : " + e.getMessage());
            e.printStackTrace();
        }
    }

    public List<User> findAll() {
        return users;
    }

    public Optional<User> findByUsername(String username) {
        return users.stream()
                .filter(u -> u.getUsername().equalsIgnoreCase(username))
                .findFirst();
    }

    public User save(User user) {
        findByUsername(user.getUsername()).ifPresent(users::remove);
        users.add(user);
        saveUsersToFile();
        return user;
    }

    public void delete(String username) {
        users.removeIf(u -> u.getUsername().equalsIgnoreCase(username));
        saveUsersToFile();
    }
}
