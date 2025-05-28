package com.homeservices.home_services_booking.model;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Paiement implements Serializable {

    private Long idPaiement;
    private Long idPaiement_Reservation;
    private Double montant;
    private Long statut;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate datePaiement;

    public Paiement() {  
    }

    public Paiement(Long idPaiement,Long idPaiement_Reservation, Double montant,Long statut, LocalDate datePaiement) {
        this.idPaiement = idPaiement;
        this.idPaiement_Reservation = idPaiement_Reservation;
        this.montant = montant;
        this.statut = statut;
        this.datePaiement = datePaiement;
    }

    public Long getIdPaiement() {
        return idPaiement;
    }

    public Long getIdPaiement_Reservation() {
        return idPaiement_Reservation;
    }

    public Double getMontant() {
        return montant;
    }

    public Long getStatut() {
        return statut;
    }

    public LocalDate getDatePaiement() {
        return datePaiement;
    }

    public void setIdPaiement_Reservation(Long idPaiement_Reservation) {
        this.idPaiement_Reservation = idPaiement_Reservation;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }

    public void setStatut(Long statut) {
        this.statut= statut;
    }

    public void setDatePaiement(LocalDate datePaiement) {
        this.datePaiement = datePaiement;
    }

    @Override
    public String toString() {
        return "Paiement{" +
               "idPaiement=" + idPaiement +
               ", idPaiement_Reservation='" + idPaiement_Reservation +
               ", montant='" + montant +
               ", statut=" + statut +
               ", datePaiement=" + datePaiement +"}";
    }
}
