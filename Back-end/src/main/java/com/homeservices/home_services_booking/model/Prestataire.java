package com.homeservices.home_services_booking.model;

import java.io.Serializable;

public class Prestataire implements Serializable {

    private Long idPrestataire;
    private Long idPrestataire_User;
    private String prestataireName;
    private String description;
    private String localisation;

    public Prestataire() {  
    }

    public Prestataire(Long idPrestataire,Long idPrestataire_User, String prestataireName,String description, String localisation) {
        this.idPrestataire = idPrestataire;
        this.idPrestataire_User = idPrestataire_User;
        this.prestataireName = prestataireName;
        this.description = description;
        this.localisation = localisation;
    }

    public Long getIdPrestataire() {
        return idPrestataire;
    }

    public Long getIdPrestataire_User() {
        return idPrestataire_User;
    }

    public String getPrestataireName() {
        return prestataireName;
    }

    public String getDescription() {
        return description;
    }

    public String getLocalisation() {
        return localisation;
    }

    public void setIdPrestataire_User(Long idPrestataire_User) {
        this.idPrestataire_User = idPrestataire_User;
    }

    public void setPrestataireName(String prestataireName) {
        this.prestataireName = prestataireName;
    }

    public void setDescription(String description) {
        this.description= description;
    }

    public void setLocalisation(String localisation) {
        this.localisation = localisation;
    }

    @Override
    public String toString() {
        return "Prestataire{" +
               "idPrestataire=" + idPrestataire +
               ",idPrestataire_User="+ idPrestataire_User +
               ", prestataireName='" + prestataireName + '\'' +
               ",description=" + description +  
               ", localisation=" + localisation +"}";
    }
}
