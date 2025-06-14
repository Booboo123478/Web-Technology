package com.homeservices.home_services_booking.controller;

import com.homeservices.home_services_booking.model.Service;
import com.homeservices.home_services_booking.repository.JsonServicesRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.homeservices.home_services_booking.model.Disponibilite;
import com.homeservices.home_services_booking.service.DisponibiliteService;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final JsonServicesRepository repository;

    public ServiceController() {
        this.repository = new JsonServicesRepository("data/services.json");
    }

    @GetMapping
    public List<Service> getAll() {
        return repository.findAll();
    }

    @GetMapping("/prestataire/{idPrestataire}")
    public List<Service> getByPrestataire(@PathVariable Long idPrestataire) {
        return repository.findByPrestataireId(idPrestataire);
    }

    @PostMapping
    public ResponseEntity<Service> createService(@RequestBody Service service) {
        System.out.println("Service reçu : " + service);
        
        DisponibiliteService dispoService = new DisponibiliteService();
        List<Disponibilite> dispoMetier = dispoService.convertir(service.getDisponibilites());
        service.setDisponibilitesMetier(dispoMetier);
        Service saved = repository.save(service);
        return ResponseEntity.ok(saved);
    }
}
