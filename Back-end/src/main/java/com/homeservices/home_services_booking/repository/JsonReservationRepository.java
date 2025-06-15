package com.homeservices.home_services_booking.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homeservices.home_services_booking.model.ReservationSimple;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class JsonReservationRepository {
    private final String filePath;
    private final ObjectMapper mapper;
    private List<ReservationSimple> reservations;

    public JsonReservationRepository(@Value("${app.reservations.file}") String filePath) {
        this.filePath = filePath;
        this.mapper = new ObjectMapper();
        this.reservations = load();
    }

    private List<ReservationSimple> load() {
        try {
            File f = new File(filePath);
            if (!f.exists() || f.length() == 0) return new ArrayList<>();
            return mapper.readValue(f, new TypeReference<List<ReservationSimple>>(){});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void save() {
        try { mapper.writerWithDefaultPrettyPrinter().writeValue(new File(filePath), reservations);}catch(IOException e){e.printStackTrace();}
    }

    public List<ReservationSimple> findAll(){return new ArrayList<>(reservations);}    

    public ReservationSimple findById(long id){return reservations.stream().filter(r->r.getIdReservation()==id).findFirst().orElse(null);}    

    public ReservationSimple save(ReservationSimple r){
        reservations.removeIf(x->x.getIdReservation()==r.getIdReservation());
        reservations.add(r); save(); return r;}

    public long nextId(){return reservations.stream().mapToLong(ReservationSimple::getIdReservation).max().orElse(0L)+1;}

    public boolean existsFinished(long clientId,long prestataireId){return reservations.stream().filter(r->r.getIdClient()==clientId && r.getStatut().equals("terminee"))
        .anyMatch(r->r.getIdService()==1 /*will map via service repo later*/);
    }

    public List<ReservationSimple> findByClient(long clientId){return reservations.stream().filter(r->r.getIdClient()==clientId).collect(Collectors.toList());}
} 