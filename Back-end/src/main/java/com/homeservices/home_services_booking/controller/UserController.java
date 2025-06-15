package com.homeservices.home_services_booking.controller;

import java.io.File;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.homeservices.home_services_booking.dto.LoginRequest;
import com.homeservices.home_services_booking.model.User;
import com.homeservices.home_services_booking.repository.JsonUserRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final JsonUserRepository userRepository;

    public UserController(@Value("${app.users.file}") String userFilePath) {
        this.userRepository = new JsonUserRepository(userFilePath);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> registerUser(@RequestParam String userName,
                                            @RequestParam String password,
                                            @RequestParam String mail,
                                            HttpSession session
                                            ) {
        final LocalDate dateInscription = LocalDate.now();

        long newId = userRepository.getMaxId() + 1;

        System.out.println("Requête d'inscription reçue : username=" + userName + ", password=" + password + ", email=" + mail);
        System.out.println("Saving file at: " + new File("data/users.json").getAbsolutePath());
        User user = new User(newId, userName, password, mail, 0L, dateInscription);
        User savedUser = userRepository.save(user);

        session.setAttribute("user", savedUser);

        System.out.println("Utilisateur sauvegardé : " + savedUser.getUserName());

        URI redirectUri = URI.create("/index.html");
        return ResponseEntity.status(HttpStatus.FOUND).location(redirectUri).build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Optional<User> user = userRepository.findAll().stream()
            .filter(u -> u.getMail().equals(email) && u.getPassword().equals(password))
            .findFirst();

        if (user.isPresent()) {
            session.setAttribute("user", user.get());
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants invalides");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getProfile(HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Non connecté");
        }

        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        System.out.println("Déconnection");
        return ResponseEntity.ok("Déconnecté");
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable long id) {
        return userRepository.findAll().stream()
                .filter(u -> u.getIdUser() != null && u.getIdUser() == id)
                .findFirst()
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
