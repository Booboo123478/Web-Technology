package com.homeservices.home_services_booking.controller;

import com.homeservices.home_services_booking.model.Message;
import com.homeservices.home_services_booking.model.User;
import com.homeservices.home_services_booking.repository.JsonMessageRepository;
import com.homeservices.home_services_booking.repository.JsonUserRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final JsonMessageRepository messageRepository;

    public MessageController(@Value("${app.message.file}") String messageFilePath) {
        this.messageRepository = new JsonMessageRepository(messageFilePath);
    }

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestParam long idDestinataire,
                                         @RequestParam String contenu,
                                         HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Non connecté");
        }

        Message message = new Message();
        message.setIdExpediteur(user.getIdUser());
        message.setIdDestinataire(idDestinataire);
        message.setContenu(contenu);
        message.setDateEnvoi(LocalDateTime.now());

        Message savedMessage = messageRepository.save(message);
        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping("/{correspondentId}")
    public ResponseEntity<?> getConversation(@PathVariable long correspondentId,
                                             HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Non connecté");
        }

        List<Message> conversation = messageRepository.findConversation(user.getIdUser(), correspondentId);
        return ResponseEntity.ok(conversation);
    }
} 