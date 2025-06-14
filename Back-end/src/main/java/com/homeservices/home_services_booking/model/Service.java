package com.homeservices.home_services_booking.model;

import java.util.List;

import com.homeservices.home_services_booking.dto.DisponibiliteDto;

public class Service {
    private Long idService;
    private Long idPrestataire;
    private String titre;
    private String metier;
    private String ville;
    private String adresse;
    private Double prix;
    private String description;

    private List<DisponibiliteDto> disponibilites;  // DTO exposé dans l'API
    private String offreImageUrl;

    private transient List<Disponibilite> disponibilitesMetier; // Usage métier, non sérialisé

    public Service() {}

    public Service(Long idService, Long idPrestataire, String titre, String metier, String ville, String adresse,
                   Double prix, String description, List<DisponibiliteDto> disponibilites,
                   String offreImageUrl, List<Disponibilite> disponibilitesMetier) {
        this.idService = idService;
        this.idPrestataire = idPrestataire;
        this.titre = titre;
        this.metier = metier;
        this.ville = ville;
        this.adresse = adresse;
        this.prix = prix;
        this.description = description;
        this.disponibilites = disponibilites;
        this.offreImageUrl = offreImageUrl;
        this.disponibilitesMetier = disponibilitesMetier;
    }

    // Getters et setters

    public Long getIdService() { return idService; }
    public void setIdService(Long idService) { this.idService = idService; }

    public Long getIdPrestataire() { return idPrestataire; }
    public void setIdPrestataire(Long idPrestataire) { this.idPrestataire = idPrestataire; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getMetier() { return metier; }
    public void setMetier(String metier) { this.metier = metier; }

    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public Double getPrix() { return prix; }
    public void setPrix(Double prix) { this.prix = prix; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<DisponibiliteDto> getDisponibilites() { return disponibilites; }
    public void setDisponibilites(List<DisponibiliteDto> disponibilites) { this.disponibilites = disponibilites; }

    public String getOffreImageUrl() { return offreImageUrl; }
    public void setOffreImageUrl(String offreImageUrl) { this.offreImageUrl = offreImageUrl; }

    public List<Disponibilite> getDisponibilitesMetier() { return disponibilitesMetier; }
    public void setDisponibilitesMetier(List<Disponibilite> disponibilitesMetier) { this.disponibilitesMetier = disponibilitesMetier; }
}
