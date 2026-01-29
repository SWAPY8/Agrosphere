package com.agrosphere.backend.service;

import com.agrosphere.backend.entity.Scheme;
import com.agrosphere.backend.repo.SchemeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchemeService {

    private final SchemeRepository schemeRepository;

    public SchemeService(SchemeRepository schemeRepository) {
        this.schemeRepository = schemeRepository;
    }

    // Fetch all schemes
    public List<Scheme> getAllSchemes() {
        return schemeRepository.findAll();
    }

    // Fetch schemes by farmer state & crop (BASIC FILTER)
    public List<Scheme> getSchemesForFarmer(String state, String crop) {
        return schemeRepository.findAll().stream()
                .filter(s ->
                        s.getRegion().equalsIgnoreCase("All")
                                || s.getRegion().toLowerCase().contains(state.toLowerCase())
                )
                .filter(s ->
                        s.getCrops().equalsIgnoreCase("All")
                                || s.getCrops().toLowerCase().contains(crop.toLowerCase())
                )
                .toList();
    }
}

