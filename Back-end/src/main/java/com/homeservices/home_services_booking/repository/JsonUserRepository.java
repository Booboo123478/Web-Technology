package com.homeservices.home_services_booking.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homeservices.home_services_booking.model.User;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class JsonUserRepository {

    private final File jsonFile;
    private final ObjectMapper objectMapper;
    private List<User> users;

    public JsonUserRepository(String filePath) {
        this.jsonFile = new File(filePath);
        this.objectMapper = new ObjectMapper();
        this.users = loadUsersFromFile();
    }

    private List<User> loadUsersFromFile() {
        if (!jsonFile.exists()) {
            return new ArrayList<>();
        }
        try {
            return objectMapper.readValue(jsonFile, new TypeReference<List<User>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void saveUsersToFile() {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(jsonFile, users);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<User> findAll() {
        return users;
    }

    public Optional<User> findByUserName(String userName) {
        return users.stream()
                .filter(u -> u.getUserName().equalsIgnoreCase(userName))
                .findFirst();
    }

    public User save(User user) {
        findByUserName(user.getUserName()).ifPresent(users::remove);
        users.add(user);
        saveUsersToFile();
        return user;
    }

    public void delete(String userName) {
        users.removeIf(u -> u.getUserName().equalsIgnoreCase(userName));
        saveUsersToFile();
    }
}
