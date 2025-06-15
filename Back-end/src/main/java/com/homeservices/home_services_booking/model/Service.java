package com.homeservices.home_services_booking.model;

import com.homeservices.home_services_booking.dto.DisponibiliteDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Service {
    private Long idService;
    private Long idPrestataire;

    // Informations principales
    private String titre;          // nom commercial du service
    private String description;
    private Double prix;

    // Infos complémentaires héritées de l'ancienne version
    private String metier;
    private String ville;
    private String adresse;

    // Champs ajoutés par la version catalogue minimal
    private String categorie;
    private String dureeEstimee;   // ex : "1h"

    // Disponibilités et média
    private List<DisponibiliteDto> disponibilites; // DTO exposé via API future
    private String offreImageUrl;
}