package com.homeservices.home_services_booking.model;

import java.io.Serializable;

public class User implements Serializable {

    private Long idUser;
    private String userName;
    private String password;
    private String mail;
    private Long role;
    private String dateInscription;

    public User() {  
    }

    public User(Long idUser, String userName, String password,String mail, Long role, String dateInscription) {
        this.idUser = idUser;
        this.userName = userName;
        this.password = password;
        this.mail = mail;
        this.role = role;
        this.dateInscription = dateInscription;
    }


    public Long getId() {
        return idUser;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }
    
    public String getMail(){
        return mail;
    }

    public Long getRole(){
        return role;
    }

    public String getDateInscription(){
        return dateInscription;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setMail(String mail){
        this.mail = mail;
    }

    public void setRole(Long role){
        this.role = role;
    }

    public void setDateInscription(String dateInscription){
        this.dateInscription = dateInscription;
    }

    @Override
    public String toString() {
        return "User{" +
               "idUser=" + idUser +
               ", userName='" + userName + '\'' +
               ", password='[PROTECTED]'}";
    }
}
