package com.homeservices.home_services_booking.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "Accueil");
        model.addAttribute("content", "home :: content");
        return "Front-end/base";  // Vue "base.html"
    }
}