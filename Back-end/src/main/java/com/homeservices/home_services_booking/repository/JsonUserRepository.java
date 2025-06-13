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

    public JsonUserRepository(String filePath) {
        this.jsonFile = new File(filePath);
        System.out.println("JSON file path: " + jsonFile.getAbsolutePath());
        this.objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    private List<User> loadUsersFromFile() {
        if (!jsonFile.exists()) {
            return new ArrayList<>();
        }
        try {
            List<User> loadedUsers = objectMapper.readValue(jsonFile, new TypeReference<List<User>>() {});
            return loadedUsers != null ? loadedUsers : new ArrayList<>();
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void saveUsersToFile(List<User> users) {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(jsonFile, users);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<User> findAll() {
        return loadUsersFromFile();
    }

    public String getFilePath() {
        return this.jsonFile.toString();
    }

    public Optional<User> findByUserName(String userName) {
        return loadUsersFromFile().stream()
                .filter(u -> u.getUserName().equalsIgnoreCase(userName))
                .findFirst();
    }

    public User save(User user) {
        List<User> users = loadUsersFromFile();
        // Remove existing user with same username (if any)
        users.removeIf(u -> u.getUserName().equalsIgnoreCase(user.getUserName()));
        users.add(user);
        saveUsersToFile(users);
        return user;
    }

    public long getMaxId() {
        return loadUsersFromFile().stream()
                .mapToLong(u -> u.getIdUser() != null ? u.getIdUser() : 0L)
                .max()
                .orElse(0L);
    }
}
