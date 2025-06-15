package com.homeservices.home_services_booking.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/session")
public class SessionController {
    @GetMapping
    @ResponseBody
    public Map<String, Object> getSessionData(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        Object user = session.getAttribute("user");
        Object prestataire = session.getAttribute("prestataire");

        if (user != null) {
            response.put("type", "user");
            response.put("data", user);
        } else if (prestataire != null) {
            response.put("type", "prestataire");
            response.put("data", prestataire);
        } else {
            response.put("type", "none");
        }

        return response;
    }  
}
