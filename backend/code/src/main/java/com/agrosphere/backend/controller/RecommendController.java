package com.agrosphere.backend.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class RecommendController {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String mlUrl = "http://127.0.0.1:8000/recommend";

    @PostMapping("/recommend")
    public ResponseEntity<String> getRecommendations(@RequestBody Map<String,Object> payload) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String,Object>> request = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(mlUrl, request, String.class);
        return ResponseEntity.ok(response.getBody());
    }
}
