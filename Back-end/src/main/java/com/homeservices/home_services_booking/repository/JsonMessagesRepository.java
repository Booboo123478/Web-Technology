package com.homeservices.home_services_booking.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homeservices.home_services_booking.model.Message;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class JsonMessagesRepository {

    private final File jsonFile;
    private final ObjectMapper objectMapper;
    private List<Message> messages;

    public JsonMessagesRepository(String filePath) {
        this.jsonFile = new File(filePath);
        this.objectMapper = new ObjectMapper();
        this.messages = loadMessagesFromFile();
    }

    private List<Message> loadMessagesFromFile() {
        if (!jsonFile.exists()) {
            return new ArrayList<>();
        }
        try {
            return objectMapper.readValue(jsonFile, new TypeReference<List<Message>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void saveMessagesToFile() {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(jsonFile, messages);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Message> findAll() {
        return messages;
    }

    public Optional<Message> findByIdMessage(Long idMessage) {
        return messages.stream()
                .filter(u -> u.getIdMessage().equals(idMessage))
                .findFirst();
    }

    public Message save(Message message) {
        findByIdMessage(message.getIdMessage()).ifPresent(messages::remove);
        messages.add(message);
        saveMessagesToFile();
        return message;
    }

    public void delete(Long idMessage) {
        messages.removeIf(u -> u.getIdMessage().equals(idMessage));
        saveMessagesToFile();
    }
}
