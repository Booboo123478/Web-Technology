package com.homeservices.home_services_booking.service;

import com.homeservices.home_services_booking.dto.DisponibiliteDto;
import com.homeservices.home_services_booking.model.Disponibilite;
import com.homeservices.home_services_booking.model.Disponibilite.PlageHoraire;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class DisponibiliteService {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");

    public List<Disponibilite> convertir(List<DisponibiliteDto> dtoList) {
        Disponibilite dispo = new Disponibilite();

        for (DisponibiliteDto dto : dtoList) {
            DayOfWeek day = mapJourToDayOfWeek(dto.getJour());
            if (day == null) continue;

            PlageHoraire matin = parseHeure(dto.getMatin());
            if (matin != null) {
                dispo.ajouterPlage(day, matin.getDebut(), matin.getFin());
            }

            PlageHoraire apresMidi = parseHeure(dto.getApresMidi());
            if (apresMidi != null) {
                dispo.ajouterPlage(day, apresMidi.getDebut(), apresMidi.getFin());
            }
        }

        List<Disponibilite> result = new ArrayList<>();
        result.add(dispo);
        return result;
    }

    private PlageHoraire parseHeure(DisponibiliteDto.Heure heureDto) {
        if (heureDto == null) return null;

        try {
            if (heureDto.getDebut() == null || heureDto.getFin() == null) return null;

            LocalTime debut = LocalTime.parse(heureDto.getDebut(), formatter);
            LocalTime fin = LocalTime.parse(heureDto.getFin(), formatter);

            if (!debut.isBefore(fin)) return null;

            return new PlageHoraire(debut, fin);
        } catch (Exception e) {
            return null;
        }
    }

    private DayOfWeek mapJourToDayOfWeek(String jour) {
        if (jour == null) return null;

        switch (jour.toLowerCase()) {
            case "lundi": return DayOfWeek.MONDAY;
            case "mardi": return DayOfWeek.TUESDAY;
            case "mercredi": return DayOfWeek.WEDNESDAY;
            case "jeudi": return DayOfWeek.THURSDAY;
            case "vendredi": return DayOfWeek.FRIDAY;
            case "samedi": return DayOfWeek.SATURDAY;
            case "dimanche": return DayOfWeek.SUNDAY;
            default: return null;
        }
    }
}