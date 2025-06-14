package com.homeservices.home_services_booking.controller;

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

    // private final JsonPrestatairesRepository repository = null;

    // public PrestataireController(@Value("${app.prestataires.file}") String filePath) {
    //     this.repository = new JsonPrestatairesRepository(filePath);
    // }

    // @GetMapping
    // public ResponseEntity<List<Prestataire>> getAll() {
    //     return ResponseEntity.ok(repository.findAll());
    // }

    // @PostMapping("/register")
    // public ResponseEntity<?> register(@RequestParam String prestataireName,
    //                                   @RequestParam String password,
    //                                   @RequestParam Long idPrestataireUser,
    //                                   @RequestParam String description,
    //                                   HttpSession session) {
    //     Long id = repository.getMaxId() + 1;
    //     Prestataire p = new Prestataire(id, password, idPrestataireUser, prestataireName, description);
    //     repository.save(p);
    //     session.setAttribute("prestataire", p);
    //     return ResponseEntity.status(HttpStatus.CREATED).body(p);
    // }

    //     public PrestataireController() {
    //     this.repository = new JsonPrestatairesRepository("/app/Back-end/data/prestataires.json");
    // }

    private final JsonPrestatairesRepository repository;

    public PrestataireController(@Value("${app.prestataires.file}") String filePath) {
        this.repository = new JsonPrestatairesRepository(filePath);
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
                                            HttpSession session  ) {
        System.out.println("Prestataire reçu : " + userName + " email : " + email);
        
        long newId = repository.getMaxId() +1;
        Prestataire prestataire = new Prestataire(newId, password,email, userName, description);

        Prestataire saved = repository.save(prestataire);
        return ResponseEntity.ok(saved);
    }

    // @PostMapping("/login")
    // public ResponseEntity<?> login(@RequestParam Long idPrestataire,
    //                                @RequestParam String password,
    //                                HttpSession session) {
    //     Optional<Prestataire> optional = repository.findAll().stream()
    //         .filter(p -> p.getIdPrestataire().equals(idPrestataire) && p.getPassword().equals(password))
    //         .findFirst();
    //     if (optional.isPresent()) {
    //         session.setAttribute("prestataire", optional.get());
    //         return ResponseEntity.ok(optional.get());
    //     } else {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants invalides");
    //     }
    // }

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
