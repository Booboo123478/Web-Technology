// package com.homeservices.home_services_booking.model;

// import com.homeservices.home_services_booking.dto.DisponibiliteDto;
// import java.io.Serializable;
// import java.math.BigDecimal;
// import java.util.List;

// public class PrestataireCopy implements Serializable {

//     private Long idPrestataire;
//     private Long idPrestataireUser;
//     private String prestataireName;
//     private String metier;      
//     private String ville;         
//     private String adresse;        
//     private BigDecimal prix;      
//     private String description;
//     private List<DisponibiliteDto> disponibilites;
//     private String offreImageUrl;

//     private transient List<Disponibilite> disponibilitesMetier; 

//     public Prestataire() {
//     }

//     public Prestataire(Long idPrestataire, Long idPrestataireUser, String prestataireName,
//                        String metier, String ville, String adresse, BigDecimal prix,
//                        String description, List<DisponibiliteDto> disponibilites, String offreImageUrl) {
//         this.idPrestataire = idPrestataire;
//         this.idPrestataireUser = idPrestataireUser;
//         this.prestataireName = prestataireName;
//         this.metier = metier;
//         this.ville = ville;
//         this.adresse = adresse;
//         this.prix = prix;
//         this.description = description;
//         this.disponibilites = disponibilites;
//         this.offreImageUrl = offreImageUrl;
//     }

//     // Getters / setters

//     public Long getIdPrestataire() {
//         return idPrestataire;
//     }

//     public void setIdPrestataire(Long idPrestataire) {
//         this.idPrestataire = idPrestataire;
//     }

//     public Long getIdPrestataireUser() {
//         return idPrestataireUser;
//     }

//     public void setIdPrestataireUser(Long idPrestataireUser) {
//         this.idPrestataireUser = idPrestataireUser;
//     }

//     public String getPrestataireName() {
//         return prestataireName;
//     }

//     public void setPrestataireName(String prestataireName) {
//         this.prestataireName = prestataireName;
//     }

//     public String getMetier() {
//         return metier;
//     }

//     public void setMetier(String metier) {
//         this.metier = metier;
//     }

//     public String getVille() {
//         return ville;
//     }

//     public void setVille(String ville) {
//         this.ville = ville;
//     }

//     public String getAdresse() {
//         return adresse;
//     }

//     public void setAdresse(String adresse) {
//         this.adresse = adresse;
//     }

//     public BigDecimal getPrix() {
//         return prix;
//     }

//     public void setPrix(BigDecimal prix) {
//         this.prix = prix;
//     }

//     public String getDescription() {
//         return description;
//     }

//     public void setDescription(String description) {
//         this.description = description;
//     }

//     public List<DisponibiliteDto> getDisponibilites() {
//         return disponibilites;
//     }

//     public void setDisponibilites(List<DisponibiliteDto> disponibilites) {
//         this.disponibilites = disponibilites;
//     }

//     public String getOffreImageUrl() {
//         return offreImageUrl;
//     }

//     public void setOffreImageUrl(String offreImageUrl) {
//         this.offreImageUrl = offreImageUrl;
//     }

//     public List<Disponibilite> getDisponibilitesMetier() {
//         return disponibilitesMetier;
//     }

//     public void setDisponibilitesMetier(List<Disponibilite> disponibilitesMetier) {
//         this.disponibilitesMetier = disponibilitesMetier;
//     }

//     @Override
//     public String toString() {
//         return "Prestataire{" +
//                 "idPrestataire=" + idPrestataire +
//                 ", idPrestataireUser=" + idPrestataireUser +
//                 ", prestataireName='" + prestataireName + '\'' +
//                 ", metier='" + metier + '\'' +
//                 ", ville='" + ville + '\'' +
//                 ", adresse='" + adresse + '\'' +
//                 ", prix=" + prix +
//                 ", description='" + description + '\'' +
//                 ", disponibilites=" + disponibilites +
//                 '}';
//     }
// }
