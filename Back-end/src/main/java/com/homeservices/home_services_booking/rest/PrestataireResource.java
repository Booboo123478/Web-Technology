
package com.homeservices.home_services_booking.rest;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homeservices.home_services_booking.model.Prestataire;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;

@jakarta.ws.rs.Path("/prestataires")
public class PrestataireResource {

    private static final Path FILE = Paths.get("prestataires.json");

    private final ObjectMapper objectMapper = new ObjectMapper();

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addPrestataire(Prestataire prestataire) {
        try {
            List<Prestataire> prestataires;

            if (Files.exists(FILE)) {
                String content = Files.readString(FILE);
                if (content.isEmpty()) {
                    prestataires = new ArrayList<>();
                } else {
                    prestataires = objectMapper.readValue(content, new TypeReference<List<Prestataire>>() {});
                }
            } else {
                prestataires = new ArrayList<>();
            }

            prestataires.add(prestataire);

            String updatedContent = objectMapper.writeValueAsString(prestataires);
            Files.writeString(FILE, updatedContent, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);

            return Response.ok().build();

        } catch (IOException e) {
            e.printStackTrace();
            return Response.serverError().entity("Erreur serveur : " + e.getMessage()).build();
        }
    }
}
