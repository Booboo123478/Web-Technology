package com.homeservices.home_services_booking.dto;

public class DisponibiliteDto {
    private String jour;
    private Heure matin;
    private Heure apresMidi;

    public DisponibiliteDto() {}

    public String getJour() {
        return jour;
    }

    public void setJour(String jour) {
        this.jour = jour;
    }

    public Heure getMatin() {
        return matin;
    }

    public void setMatin(Heure matin) {
        this.matin = matin;
    }

    public Heure getApresMidi() {
        return apresMidi;
    }

    public void setApresMidi(Heure apresMidi) {
        this.apresMidi = apresMidi;
    }

    public static class Heure {
        private String debut; // format "HH:mm"
        private String fin;

        public Heure() {}

        public String getDebut() {
            return debut;
        }

        public void setDebut(String debut) {
            this.debut = debut;
        }

        public String getFin() {
            return fin;
        }

        public void setFin(String fin) {
            this.fin = fin;
        }
    }
}
