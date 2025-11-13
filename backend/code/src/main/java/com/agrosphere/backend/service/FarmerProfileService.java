package com.agrosphere.backend.service;

import com.agrosphere.backend.entity.FarmerProfile;
import com.agrosphere.backend.repo.FarmerProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FarmerProfileService {

    @Autowired
    private FarmerProfileRepository farmerRepo;

    public FarmerProfile registerFarmer(FarmerProfile farmer) {
        // Check if email already exists
        if (farmerRepo.findByEmail(farmer.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered: " + farmer.getEmail());
        }

        return farmerRepo.save(farmer);
    }
}
