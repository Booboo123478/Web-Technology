package com.homeservices.home_services_booking.model;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {

    private Long idUser;
    private String userName;
    private String password;
    private String mail;
    private Long role;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateInscription;

    @Override
    public String toString() {
        return "User{" +
               "idUser=" + idUser +
               ", userName='" + userName + '\'' +
               ", password='[PROTECTED]'" +
               ", mail=" + mail + 
               ",role=" + role +
               ", date d'inscription=" + dateInscription +"}" ;
    }
}
