package com.homeservices.home_services_booking.model;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

public class Disponibilite {

    // Pour chaque jour, une liste de plages horaires (ex : matin + après-midi)
    private Map<DayOfWeek, List<PlageHoraire>> disponibilites = new EnumMap<>(DayOfWeek.class);

    public Disponibilite() {
        // Initialiser les listes vides pour chaque jour (optionnel)
        for (DayOfWeek day : DayOfWeek.values()) {
            disponibilites.put(day, new ArrayList<>());
        }
    }

    public void ajouterPlage(DayOfWeek jour, LocalTime debut, LocalTime fin) {
        if (debut == null || fin == null || !debut.isBefore(fin)) {
            throw new IllegalArgumentException("Plage horaire invalide");
        }
        disponibilites.computeIfAbsent(jour, k -> new ArrayList<>())
                      .add(new PlageHoraire(debut, fin));
    }

    public List<PlageHoraire> getPlages(DayOfWeek jour) {
        return disponibilites.getOrDefault(jour, List.of());
    }

    public Map<DayOfWeek, List<PlageHoraire>> getDisponibilites() {
        return disponibilites;
    }

    public static class PlageHoraire {
        private LocalTime debut;
        private LocalTime fin;

        public PlageHoraire() {
        }

        public PlageHoraire(LocalTime debut, LocalTime fin) {
            this.debut = debut;
            this.fin = fin;
        }

        public LocalTime getDebut() {
            return debut;
        }

        public LocalTime getFin() {
            return fin;
        }

        @Override
        public String toString() {
            return "PlageHoraire{" +
                    "debut=" + debut +
                    ", fin=" + fin +
                    '}';
        }
    }
}
