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

    private String titre;
    private String description;
    private Double prix;

    private String metier;
    private String ville;
    private String adresse;

    private String categorie;
    private String dureeEstimee;

    private List<DisponibiliteDto> disponibilites;
    private String offreImageUrl;
}