package com.homeservices.home_services_booking.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.homeservices.home_services_booking.model.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class JsonMessageRepository {

    private final String filePath;
    private final ObjectMapper objectMapper;
    private List<Message> messages;

    public JsonMessageRepository(@Value("${app.messages.file}") String filePath) {
        this.filePath = filePath;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
        this.messages = loadMessagesFromFile();
    }

    private List<Message> loadMessagesFromFile() {
        try {
            File file = new File(filePath);
            if (!file.exists() || file.length() == 0) {
                return new ArrayList<>();
            }
            return objectMapper.readValue(file, new TypeReference<List<Message>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void saveMessagesToFile() {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(filePath), messages);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Message> findAll() {
        return new ArrayList<>(messages);
    }

    public List<Message> findConversation(long userId1, long userId2) {
        return messages.stream()
                .filter(m -> (m.getIdExpediteur() == userId1 && m.getIdDestinataire() == userId2) ||
                             (m.getIdExpediteur() == userId2 && m.getIdDestinataire() == userId1))
                .sorted(Comparator.comparing(Message::getDateEnvoi))
                .collect(Collectors.toList());
    }

    public Message save(Message message) {
        message.setIdMessage(getMaxId() + 1);
        messages.add(message);
        saveMessagesToFile();
        return message;
    }

    public Optional<Message> findById(long messageId) {
        return messages.stream()
                .filter(m -> m.getIdMessage() == messageId)
                .findFirst();
    }

    public void deleteById(long messageId) {
        messages.removeIf(m -> m.getIdMessage() == messageId);
        saveMessagesToFile();
    }

    public long getMaxId() {
        return messages.stream()
                .mapToLong(Message::getIdMessage)
                .max()
                .orElse(0L);
    }
} 