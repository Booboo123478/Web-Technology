package com.homeservices.home_services_booking.controller;

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

    public UserController() {
        this.userRepository = new JsonUserRepository("/Back-end/data/users.json");
    }

    @PostMapping("/register")
    public User registerUser(@RequestParam String userName,
                             @RequestParam String password,
                             @RequestParam String mail) {
        LocalDate dateInscription = LocalDate.now();

        // Get max existing id and increment
        long newId = userRepository.getMaxId() + 1;

        System.out.println("Registering user: username=" + userName + ", email=" + mail);
        User user = new User(newId, userName, password, mail, 0L, dateInscription);
        User savedUser = userRepository.save(user);
        System.out.println("User saved: " + savedUser.getUserName());
        return savedUser;
    }

    @GetMapping("/test")
    public String test() {
        return "Test OK";
    }
}
