package com.agrosphere.backend.controller;

import com.agrosphere.backend.entity.Scheme;
import com.agrosphere.backend.service.SchemeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schemes")
@CrossOrigin
public class SchemeController {

    private final SchemeService schemeService;

    public SchemeController(SchemeService schemeService) {
        this.schemeService = schemeService;
    }

    // 1️⃣ Get all schemes
    @GetMapping
    public List<Scheme> getAllSchemes() {
        return schemeService.getAllSchemes();
    }

    // 2️⃣ Get schemes by farmer data (simple filter)
    @GetMapping("/filter")
    public List<Scheme> getSchemesForFarmer(
            @RequestParam String state,
            @RequestParam String crop
    ) {
        return schemeService.getSchemesForFarmer(state, crop);
    }
}
