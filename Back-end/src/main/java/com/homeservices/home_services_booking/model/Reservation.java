/*package com.homeservices.home_services_booking.model;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation implements Serializable {

    private Long idReservation;
    private Long idClient;
    private Long idService;
    private String dateReservation; // ISO yyyy-MM-dd
    private String statut; // attente | confirmee | terminee
    private String modeDePaiement;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateReservation_LocalDate;

    public Reservation() {  
    }

    public Reservation(Long idReservation, Long idClient, Long idService, String dateReservation, String statut) {
        this.idReservation = idReservation;
        this.idClient = idClient;
        this.idService = idService;
        this.dateReservation = dateReservation;
        this.statut = statut;
    }

    public Long getIdReservation() {
        return idReservation;
    }

    public Long getIdClient() {
        return idClient;
    }

    public Long getIdService() {
        return idService;
    }

    public String getDateReservation() {
        return dateReservation;
    }

    public String getStatut() {
        return statut;
    }

    public String getModeDePaiement() {
        return modeDePaiement;
    }

    public LocalDate getDateReservation_LocalDate() {
        return dateReservation_LocalDate;
    }

    public void setIdClient(Long idClient) {
        this.idClient = idClient;
    }

    public void setIdService(Long idService) {
        this.idService = idService;
    }

    public void setDateReservation(String dateReservation) {
        this.dateReservation = dateReservation;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public void setModeDePaiement(String modeDePaiement) {
        this.modeDePaiement = modeDePaiement;
    }

    public void setDateReservation_LocalDate(LocalDate dateReservation_LocalDate) {
        this.dateReservation_LocalDate = dateReservation_LocalDate;
    }

    @Override
    public String toString() {
        return "Reservation{" +
               "idReservation=" + idReservation +
               ", idClient='" + idClient +
               ", idService='" + idService +
               ", dateReservation=" + dateReservation +
               ", statut=" + statut +
               ", modeDePaiement=" + modeDePaiement + 
               ", dateReservation_LocalDate=" + dateReservation_LocalDate +"}";
    }
}

/*
 * Old Reservation model (SQL-oriented) commented out to switch to JSON minimal model.
 */
