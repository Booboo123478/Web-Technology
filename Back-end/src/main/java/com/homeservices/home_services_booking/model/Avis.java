package com.homeservices.home_services_booking.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Avis {
    private long idAvis;
    private long idClient;
    private long idPrestataire;
    private int note; // 1 à 5
    private String commentaire;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateAvis;
}
