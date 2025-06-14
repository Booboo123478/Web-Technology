// package com.homeservices.home_services_booking.controller;

// import java.util.List;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.homeservices.home_services_booking.model.Disponibilite;
// import com.homeservices.home_services_booking.model.Prestataire;
// import com.homeservices.home_services_booking.repository.JsonPrestatairesRepository;
// import com.homeservices.home_services_booking.service.DisponibiliteService;

// @RestController
// @RequestMapping("/api/prestataires")
// public class PrestataireController {

//     private final JsonPrestatairesRepository repository;

//     public PrestataireController() {
//         this.repository = new JsonPrestatairesRepository("/app/Back-end/data/prestataires.json");
//     }

//     @GetMapping
//     public List<Prestataire> getAll() {
//         return repository.findAll();
//     }

//     @PostMapping
//     public ResponseEntity<Prestataire> createPrestataire(@RequestBody Prestataire prestataire) {
//         System.out.println("Prestataire reçu : " + prestataire);
        
//         DisponibiliteService dispoService = new DisponibiliteService();
//         List<Disponibilite> dispoMetier = dispoService.convertir(prestataire.getDisponibilites());
//         prestataire.setDisponibilitesMetier(dispoMetier);

//         Prestataire saved = repository.save(prestataire);
//         return ResponseEntity.ok(saved);
//     }
// }
