package com.homeservices.home_services_booking.controller;

import java.util.concurrent.atomic.AtomicLong;

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
    }

    @PostMapping("/register")
    public User registerUser(@RequestParam String username,
                            @RequestParam String password,
                            @RequestParam String email) {
        System.out.println("Requête d'inscription reçue : username=" + username + ", password=" + password + ", email=" + email);
        User user = new User(idCounter.getAndIncrement(), username, password, email);
        User savedUser = userRepository.save(user);
        System.out.println("Utilisateur sauvegardé : " + savedUser.getUsername());
        return savedUser;
    }

    @GetMapping("/test")
    public String test() {
        return "Test OK";
    }
}
