/*package com.homeservices.home_services_booking.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homeservices.home_services_booking.model.Reservation;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class JsonReservationsRepository {

    private final File jsonFile;
    private final ObjectMapper objectMapper;
    private List<Reservation> reservations;

    public JsonReservationsRepository(String filePath) {
        this.jsonFile = new File(filePath);
        this.objectMapper = new ObjectMapper();
        this.reservations = loadReservationsFromFile();
    }

    private List<Reservation> loadReservationsFromFile() {
        if (!jsonFile.exists()) {
            return new ArrayList<>();
        }
        try {
            return objectMapper.readValue(jsonFile, new TypeReference<List<Reservation>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void saveReservationsToFile() {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(jsonFile, reservations);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Reservation> findAll() {
        return reservations;
    }

    public Optional<Reservation> findByIdReservation(Long idReservation) {
        return reservations.stream()
                .filter(u -> u.getIdReservation().equals(idReservation))
                .findFirst();
    }

    public Reservation save(Reservation reservation) {
        findByIdReservation(reservation.getIdReservation()).ifPresent(reservations::remove);
        reservations.add(reservation);
        saveReservationsToFile();
        return reservation;
    }

    public void delete(Long idReservation) {
        reservations.removeIf(u -> u.getIdReservation().equals(idReservation));
        saveReservationsToFile();
    }
}

 */
