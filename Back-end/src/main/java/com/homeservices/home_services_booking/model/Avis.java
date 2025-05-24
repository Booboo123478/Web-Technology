package com.homeservices.home_services_booking.model;

import java.io.Serializable;

public class Avis implements Serializable {

    private Long idAvis;
    private Long idAvis_Client;
    private Long idAvis_Prestataire;
    private Long note;
    private String commentaire;
    private String dateAvis;

    public Avis() {  
    }

    public Avis(Long idAvis,Long idAvis_Client, Long idAvis_Prestataire,Long note,String commentaire, String dateAvis) {
        this.idAvis = idAvis;
        this.idAvis_Client = idAvis_Client;
        this.idAvis_Prestataire = idAvis_Prestataire;
        this.note = note;
        this.commentaire = commentaire;
        this.dateAvis = dateAvis;
    }

    public Long getIdAvis() {
        return idAvis;
    }

    public Long getIdAvis_Client() {
        return idAvis_Client;
    }

    public Long getIdAvis_Prestataire() {
        return idAvis_Prestataire;
    }

    public Long getNote() {
        return note;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public String getDateAvis() {
        return dateAvis;
    }

    public void setIdAvis_Client(Long idAvis_Client) {
        this.idAvis_Client = idAvis_Client;
    }

    public void setIdAvis_Prestataire(Long idAvis_Prestataire) {
        this.idAvis_Prestataire = idAvis_Prestataire;
    }

    public void setNote(Long note) {
        this.note= note;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire= commentaire;
    }

    public void setDateAvis(String dateAvis) {
        this.dateAvis = dateAvis;
    }

    @Override
    public String toString() {
        return "Avis{" +
               "idAvis=" + idAvis +
               ", idAvis_Client='" + idAvis_Client +
               ", idAvis_Prestataire='" + idAvis_Prestataire +
               ", note=" + note +
               ", commentaire=" + commentaire + 
               ", dateAvis=" + dateAvis +"}";
    }
}
