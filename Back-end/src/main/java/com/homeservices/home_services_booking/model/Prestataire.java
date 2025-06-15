package com.homeservices.home_services_booking.model;

public class Prestataire {
    private Long idPrestataire;
    private String password;
    private String prestataireMail; 
    private Long role = 1L;
    private String prestataireName;
    private String description;

    // Constructeur vide requis pour la désérialisation JSON
    public Prestataire() {}

    public Prestataire(Long idPrestataire, String password, String prestataireMail, String prestataireName, String description) {
        this.idPrestataire = idPrestataire;
        this.password = password;
        this.prestataireMail = prestataireMail;
        this.role = 1L;
        this.prestataireName = prestataireName;
        this.description = description;
    }

    // Getters et setters
    public Long getIdPrestataire() {
        return idPrestataire;
    }

    public void setIdPrestataire(Long idPrestataire) {
        this.idPrestataire = idPrestataire;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPrestataireMail() {
        return prestataireMail;
    }

    public void setPrestataireMail(String prestataireMail) {
        this.prestataireMail = prestataireMail;
    }

    public String getPrestataireName() {
        return prestataireName;
    }

    public void setPrestataireName(String prestataireName) {
        this.prestataireName = prestataireName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getRole() {
        return role;
    }

    public void setRole(Long role) {
        this.role = role;
    }
}
