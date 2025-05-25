package com.homeservices.home_services_booking.controller;

import java.util.concurrent.atomic.AtomicLong;
import java.time.LocalDate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.homeservices.home_services_booking.model.User;
import com.homeservices.home_services_booking.repository.JsonUserRepository;

@RestController
@RequestMapping("/users")
public class UserController {

    private final JsonUserRepository userRepository;
    private final AtomicLong idCounter = new AtomicLong(1);

    public UserController() {
        this.userRepository = new JsonUserRepository("/Back-end/data/users.json");
        long maxId = userRepository.findAll().stream()
        .mapToLong(User -> User.getIdUser() != null ? User.getIdUser() : 0L)
        .max()
        .orElse(0L);
    this.idCounter.set(maxId + 1);
    }

    @PostMapping("/register")
    public User registerUser(@RequestParam String userName,
                            @RequestParam String password,
                            @RequestParam String mail
                            ) {
        final LocalDate dateInscription = LocalDate.now();

        System.out.println("Requête d'inscription reçue : username=" + userName + ", password=" + password + ", email=" + mail);
        User user = new User(idCounter.getAndIncrement(), userName, password, mail, (long) 0, dateInscription);
        User savedUser = userRepository.save(user);
        System.out.println("Utilisateur sauvegardé : " + savedUser.getUserName());
        return savedUser;
    }

    @GetMapping("/test")
    public String test() {
        return "Test OK";
    }
}
