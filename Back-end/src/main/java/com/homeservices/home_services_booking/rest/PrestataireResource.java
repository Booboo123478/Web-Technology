
package com.homeservices.home_services_booking.rest;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homeservices.home_services_booking.model.Prestataire;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
// import jakarta.ws.rs.Path;
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

    // Chemin vers le fichier JSON qui stocke la liste des prestataires
    private static final Path FILE = Paths.get("prestataires.json");

    // ObjectMapper pour sérialiser/désérialiser JSON
    private final ObjectMapper objectMapper = new ObjectMapper();

    @POST
    @Consumes(MediaType.APPLICATION_JSON) // Attend un JSON en entrée
    public Response addPrestataire(Prestataire prestataire) {
        try {
            List<Prestataire> prestataires;

            // Si le fichier existe, on lit et désérialise la liste existante
            if (Files.exists(FILE)) {
                String content = Files.readString(FILE);
                if (content.isEmpty()) {
                    prestataires = new ArrayList<>();
                } else {
                    prestataires = objectMapper.readValue(content, new TypeReference<List<Prestataire>>() {});
                }
            } else {
                // Sinon, on crée une nouvelle liste vide
                prestataires = new ArrayList<>();
            }

            // Ajoute le nouveau prestataire à la liste
            prestataires.add(prestataire);

            // Sérialise la liste mise à jour et écrit dans le fichier (création ou écrasement)
            String updatedContent = objectMapper.writeValueAsString(prestataires);
            Files.writeString(FILE, updatedContent, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);

            // Retourne une réponse HTTP 200 OK
            return Response.ok().build();

        } catch (IOException e) {
            e.printStackTrace();
            // En cas d'erreur, retourne HTTP 500 avec message d'erreur
            return Response.serverError().entity("Erreur serveur : " + e.getMessage()).build();
        }
    }
}
