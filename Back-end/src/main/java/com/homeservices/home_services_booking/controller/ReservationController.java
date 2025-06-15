package com.homeservices.home_services_booking.controller;

import com.homeservices.home_services_booking.model.ReservationSimple;
import com.homeservices.home_services_booking.model.Service;
import com.homeservices.home_services_booking.repository.JsonReservationRepository;
import com.homeservices.home_services_booking.repository.JsonServiceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final JsonReservationRepository reservationRepository;
    private final JsonServiceRepository serviceRepository;

    public ReservationController(JsonReservationRepository reservationRepository, JsonServiceRepository serviceRepository) {
        this.reservationRepository = reservationRepository;
        this.serviceRepository = serviceRepository;
    }

    // Créer une réservation : idService et date (yyyy-MM-dd) dans le body x-www-form-urlencoded
    @PostMapping
    public ResponseEntity<ReservationSimple> create(@RequestParam long idClient,
                                                    @RequestParam long idService,
                                                    @RequestParam String date,
                                                    @RequestParam(required = false) String heure) {
        ReservationSimple r = new ReservationSimple();
        r.setIdReservation(reservationRepository.nextId());
        r.setIdClient(idClient);
        r.setIdService(idService);
        r.setDateReservation(heure!=null? date+" "+heure:date);
        r.setStatut("en_attente");
        return ResponseEntity.ok(reservationRepository.save(r));
    }

    // Lister les réservations – possibilité de filtrer par client
    @GetMapping
    public List<ReservationSimple> list(@RequestParam(required = false) Long clientId) {
        if (clientId == null) return reservationRepository.findAll();
        return reservationRepository.findByClient(clientId);
    }

    // Changer le statut
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> changeStatus(@PathVariable long id, @RequestParam String value) {
        ReservationSimple r = reservationRepository.findById(id);
        if (r == null) return ResponseEntity.notFound().build();
        r.setStatut(value);
        reservationRepository.save(r);
        return ResponseEntity.ok(r);
    }

    // Réservations des services d'un prestataire
    @GetMapping("/prestataire/{id}")
    public List<ReservationSimple> listByPrestataire(@PathVariable long id,
                                                     @RequestParam(required = false) String statut) {
        List<Long> servicesIds = serviceRepository.findAll().stream()
                .filter(s -> s.getIdPrestataire() != null && s.getIdPrestataire() == id)
                .map(Service::getIdService)
                .toList();
        return reservationRepository.findAll().stream()
                .filter(r -> servicesIds.contains(r.getIdService()))
                .filter(r -> statut == null || r.getStatut().equalsIgnoreCase(statut))
                .toList();
    }
} 