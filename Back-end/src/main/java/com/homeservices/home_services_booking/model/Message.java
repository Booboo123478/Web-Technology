package com.homeservices.home_services_booking.model;

import java.io.Serializable;

public class Message implements Serializable {

    private Long idMessage;
    private Long idMessage_Expediteur;
    private Long idMessage_Destinataire;
    private String contenu;
    private String dateEnvoi;

    public Message() {  
    }

    public Message(Long idMessage,Long idMessage_Expediteur, Long idMessage_Destinataire,String contenu, String dateEnvoi) {
        this.idMessage = idMessage;
        this.idMessage_Expediteur = idMessage_Expediteur;
        this.idMessage_Destinataire = idMessage_Destinataire;
        this.contenu = contenu;
        this.dateEnvoi = dateEnvoi;
    }

    public Long getIdMessage() {
        return idMessage;
    }

    public Long getIdMessage_Expediteur() {
        return idMessage_Expediteur;
    }

    public Long getIdMessage_Destinataire() {
        return idMessage_Destinataire;
    }

    public String getContenu() {
        return contenu;
    }

    public String getDateEnvoi() {
        return dateEnvoi;
    }

    public void setIdMessage_Expediteur(Long idMessage_Expediteur) {
        this.idMessage_Expediteur = idMessage_Expediteur;
    }

    public void setIdMessage_Destinataire(Long idMessage_Destinataire) {
        this.idMessage_Destinataire = idMessage_Destinataire;
    }

    public void setContenu(String contenu) {
        this.contenu= contenu;
    }

    public void setDateEnvoi(String dateEnvoi) {
        this.dateEnvoi = dateEnvoi;
    }

    @Override
    public String toString() {
        return "Message{" +
               "idMessage=" + idMessage +
               ", idMessage_Expediteur='" + idMessage_Expediteur +
               ", idMessage_Destinataire='" + idMessage_Destinataire +
               ", contenu=" + contenu + 
               ", dateEnvoi=" + dateEnvoi +"}";
    }
}
