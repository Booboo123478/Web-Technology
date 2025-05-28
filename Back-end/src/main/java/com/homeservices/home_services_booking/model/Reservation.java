package com.homeservices.home_services_booking.model;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Reservation implements Serializable {

    private Long idReservation;
    private Long idReservation_Client;
    private Long idReservation_Services;
    private Long statut;
    private String modeDePaiement;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateReservation;

    public Reservation() {  
    }

    public Reservation(Long idReservation,Long idReservation_Client, Long idReservation_Services,Long statut,String modeDePaiement, LocalDate dateReservation) {
        this.idReservation = idReservation;
        this.idReservation_Client = idReservation_Client;
        this.idReservation_Services = idReservation_Services;
        this.statut = statut;
        this.modeDePaiement = modeDePaiement;
        this.dateReservation = dateReservation;
    }

    public Long getIdReservation() {
        return idReservation;
    }

    public Long getIdReservation_Client() {
        return idReservation_Client;
    }

    public Long getIdReservation_Services() {
        return idReservation_Services;
    }

    public Long getStatut() {
        return statut;
    }

    public String getModeDePaiement() {
        return modeDePaiement;
    }

    public LocalDate getDateReservation() {
        return dateReservation;
    }

    public void setIdReservation_Client(Long idReservation_Client) {
        this.idReservation_Client = idReservation_Client;
    }

    public void setIdReservation_Services(Long idReservation_Services) {
        this.idReservation_Services = idReservation_Services;
    }

    public void setStatut(Long statut) {
        this.statut= statut;
    }

    public void setModeDePaiement(String modeDePaiement) {
        this.modeDePaiement= modeDePaiement;
    }

    public void setDateReservation(LocalDate dateReservation) {
        this.dateReservation = dateReservation;
    }

    @Override
    public String toString() {
        return "Reservation{" +
               "idReservation=" + idReservation +
               ", idReservation_Client='" + idReservation_Client +
               ", idReservation_Services='" + idReservation_Services +
               ", statut=" + statut +
               ", modeDePaiement=" + modeDePaiement + 
               ", dateReservation=" + dateReservation +"}";
    }
}
