package com.homeservices.home_services_booking.controller;

import com.homeservices.home_services_booking.dto.LoginRequest;
import com.homeservices.home_services_booking.model.Prestataire;
import com.homeservices.home_services_booking.model.User;
import com.homeservices.home_services_booking.repository.JsonPrestatairesRepository;
import com.homeservices.home_services_booking.repository.JsonUserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/prestataires")
public class PrestataireController {

    private final JsonPrestatairesRepository repository;
    private final JsonUserRepository        userRepository;

    public PrestataireController(JsonPrestatairesRepository repository,
                                 @Value("${app.users.file}") String userFilePath) {
        this.repository     = repository;
        this.userRepository = new JsonUserRepository(userFilePath);
    }

    @GetMapping
    public List<Prestataire> getAll() {
        return repository.findAll();
    }

    @PostMapping("/register")
public ResponseEntity<Prestataire> createPrestataire(@RequestParam String userName,
                                                     @RequestParam String password,
                                                     @RequestParam String email,
                                                     @RequestParam String description,
                                                     HttpSession session) {

    long newId = Math.max(repository.getMaxId(), userRepository.getMaxId()) + 1;

    User newUser = new User(newId, userName, password, email, 1L, LocalDate.now());
    userRepository.save(newUser);

    Prestataire prestataire = new Prestataire(newId, password, email, userName, description);
    Prestataire saved       = repository.save(prestataire);

    session.setAttribute("user",       newUser);
    session.setAttribute("prestataire", saved);

    return ResponseEntity.status(HttpStatus.CREATED).body(saved);
}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest,
                                   HttpSession session) {

        String email    = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Optional<Prestataire> prestataireOpt = repository.findAll().stream()
                .filter(p -> p.getPrestataireMail().equals(email) &&
                             p.getPassword().equals(password))
                .findFirst();

        if (prestataireOpt.isPresent()) {
            session.setAttribute("prestataire", prestataireOpt.get());
            session.setAttribute("user",       userRepository.findByUserName(prestataireOpt.get().getPrestataireName()).orElse(null));
            return ResponseEntity.ok(prestataireOpt.get());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants invalides");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getConnected(HttpSession session) {
        Prestataire prestataire = (Prestataire) session.getAttribute("prestataire");
        if (prestataire == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Non connecté");
        }
        return ResponseEntity.ok(prestataire);
    }
}