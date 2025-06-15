package com.homeservices.home_services_booking.controller;

import com.homeservices.home_services_booking.model.Avis;
import com.homeservices.home_services_booking.model.Service;
import com.homeservices.home_services_booking.model.User;
import com.homeservices.home_services_booking.repository.JsonAvisRepository;
import com.homeservices.home_services_booking.repository.JsonReservationRepository;
import com.homeservices.home_services_booking.repository.JsonServiceRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/avis")
public class AvisController {

    private final JsonAvisRepository avisRepository;
    private final JsonReservationRepository reservationRepository;
    private final JsonServiceRepository serviceRepository;

    public AvisController(JsonAvisRepository avisRepository,
                          JsonReservationRepository reservationRepository,
                          JsonServiceRepository serviceRepository) {
        this.avisRepository = avisRepository;
        this.reservationRepository = reservationRepository;
        this.serviceRepository = serviceRepository;
    }

    @PostMapping
    public ResponseEntity<?> createAvis(@RequestParam long idPrestataire,
                                        @RequestParam int note,
                                        @RequestParam String commentaire,
                                        HttpSession session) {
        User client = (User) session.getAttribute("user");
        if (client == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Client non connecté");
        }

        // Validation de la réservation terminée
        boolean ok = reservationRepository.findByClient(client.getIdUser()).stream()
                .filter(r -> r.getStatut().equals("terminee"))
                .anyMatch(r -> {
                    Service s = serviceRepository.findById(r.getIdService());
                    return s != null && s.getIdPrestataire() == idPrestataire;
                });
        if (!ok) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Vous n'avez aucun service venant de ce prestataire");
        }

        if (note < 1 || note > 5) {
            return ResponseEntity.badRequest().body("La note doit être entre 1 et 5.");
        }

        Avis avis = new Avis();
        avis.setIdClient(client.getIdUser());
        avis.setIdPrestataire(idPrestataire);
        avis.setNote(note);
        avis.setCommentaire(commentaire);
        avis.setDateAvis(LocalDate.now());

        Avis savedAvis = avisRepository.save(avis);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAvis);
    }

    @GetMapping("/prestataire/{prestataireId}")
    public ResponseEntity<List<Avis>> getAvisByPrestataire(@PathVariable long prestataireId) {
        List<Avis> avis = avisRepository.findByPrestataireId(prestataireId);
        return ResponseEntity.ok(avis);
    }
} 