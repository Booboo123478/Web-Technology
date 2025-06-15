package com.homeservices.home_services_booking.controller;

import com.homeservices.home_services_booking.dto.LoginRequest;
import com.homeservices.home_services_booking.model.Prestataire;
import com.homeservices.home_services_booking.repository.JsonPrestatairesRepository;


import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/prestataires")
public class PrestataireController {

    private final JsonPrestatairesRepository repository;

    public PrestataireController(@Value("${app.prestataires.file}") String filePath) {
        this.repository = new JsonPrestatairesRepository(filePath);
    }

    @GetMapping
    public List<Prestataire> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<Prestataire> createPrestataire(@RequestBody Prestataire prestataire) {
        System.out.println("Prestataire reçu : " + prestataire);
        Prestataire saved = repository.save(prestataire);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Optional<Prestataire> prestataire = repository.findAll().stream()
            .filter(p -> p.getPrestataireMail().equals(email) && p.getPassword().equals(password))
            .findFirst();

        prestataire.ifPresent(p -> System.out.println("Prestataire trouvé : " + p.getPrestataireMail()));
        if (prestataire.isPresent()) {
            session.setAttribute("prestataire", prestataire.get());
            return ResponseEntity.ok(prestataire.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants invalides");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getConnected(HttpSession session) {
        Prestataire prestataire = (Prestataire) session.getAttribute("prestataire");
        if (prestataire == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Non connecté");
        }
        return ResponseEntity.ok(prestataire);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Déconnecté");
    }
}
