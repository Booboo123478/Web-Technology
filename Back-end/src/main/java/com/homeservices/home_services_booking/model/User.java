package com.homeservices.home_services_booking.model;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public class User implements Serializable {

    private Long idUtilisateur;
    private String username;
    private String password;
    private String email;
    private String role;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateInscription;

    // Constructeur par défaut requis pour la sérialisation JSON
    public User() {  
    }

    public User(Long idUtilisateur, String username, String password, String email) {
        this.idUtilisateur = idUtilisateur;
        this.username = username;
        this.password = password;
        this.email = email;
    }


    public Long getIdUtilisateur() {
        return idUtilisateur;
    }
    public void setIdUtilisateur(Long idUtilisateur) {
        this.idUtilisateur = idUtilisateur;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    public LocalDate getDateInscription() {
        return dateInscription;
    }
    public void setDateInscription(LocalDate dateInscription) {
        this.dateInscription = dateInscription;
    }

    @Override
    public String toString() {
        return "User{" +
               "idUtilisateur=" + idUtilisateur +
               ", username='" + username + '\'' +
               ", password='[PROTECTED]'}";
    }

}
