// package com.homeservices.home_services_booking.repository;

// import com.fasterxml.jackson.core.type.TypeReference;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.homeservices.home_services_booking.model.Prestataire;

// import java.io.File;
// import java.io.IOException;
// import java.util.ArrayList;
// import java.util.List;

// public class JsonPrestatairesRepository {

//     private final File file;
//     private final ObjectMapper objectMapper;
//     private List<Prestataire> prestataires;

//     public JsonPrestatairesRepository(String filePath) {
//         this.file = new File(filePath);
//         this.objectMapper = new ObjectMapper();
//         this.prestataires = loadFromFile();
//     }

//     private List<Prestataire> loadFromFile() {
//         try {
//             if (file.exists()) {
//                 return objectMapper.readValue(file, new TypeReference<>() {});
//             }
//         } catch (IOException e) {
//             e.printStackTrace();
//         }
//         return new ArrayList<>();
//     }

//     public Prestataire save(Prestataire prestataire) {
//         prestataires.add(prestataire);
//         writeToFile(); // Important !
//         return prestataire;
//     }

//     private void writeToFile() {
//         try {
//             objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, prestataires);
//         } catch (IOException e) {
//             e.printStackTrace();
//         }
//     }

//     public List<Prestataire> findAll() {
//         return new ArrayList<>(prestataires);
//     }
// }
