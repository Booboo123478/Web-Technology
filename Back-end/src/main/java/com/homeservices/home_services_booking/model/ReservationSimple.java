package com.homeservices.home_services_booking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationSimple {
    private long idReservation;
    private long idClient;
    private long idService;
    private String dateReservation;
    private String statut;
} 