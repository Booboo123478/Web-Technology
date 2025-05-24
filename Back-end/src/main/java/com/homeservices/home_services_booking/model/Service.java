package com.homeservices.home_services_booking.model;

import java.io.Serializable;

public class Service implements Serializable {

    private Long idService;
    private Long idService_Prestataire;
    private String serviceName;
    private Long price;
    private String description;
    private String categorie;
    private String dureeEstimee;

    public Service() {  
    }

    public Service(Long idService,Long idService_Prestataire, String serviceName,Long price, String description, String categorie, String dureeEstimee) {
        this.idService = idService;
        this.idService_Prestataire = idService_Prestataire;
        this.serviceName = serviceName;
        this.price = price;
        this.description = description;
        this.categorie = categorie;
        this.dureeEstimee = dureeEstimee;
    }

    public Long getIdService() {
        return idService;
    }

    public Long getIdService_Prestataire() {
        return idService_Prestataire;
    }

    public String getServiceName() {
        return serviceName;
    }

    public Long getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public String getCategorie() {
        return categorie;
    }

    public String getDureeEstimee() {
        return dureeEstimee;
    }

    public void setIdService_Prestataire(Long idService_Prestataire) {
        this.idService_Prestataire = idService_Prestataire;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public void setDescription(String description) {
        this.description= description;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public void setDureeEstimee(String dureeEstimee) {
        this.dureeEstimee = dureeEstimee;
    }

    @Override
    public String toString() {
        return "Service{" +
               "idService=" + idService +
               ",idService_Prestataire="+ idService_Prestataire +
               ", serviceName='" + serviceName +
               ", price="+ price +
               ",description=" + description +  
               ", categorie=" + categorie +
               ", dureeEstimee" + dureeEstimee + "}";
    }
}
