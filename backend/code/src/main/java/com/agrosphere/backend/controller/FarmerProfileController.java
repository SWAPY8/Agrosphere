package com.agrosphere.backend.controller;

import com.agrosphere.backend.entity.FarmerProfile;
import com.agrosphere.backend.service.FarmerProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/farmer")
@CrossOrigin(origins = "http://localhost:3000")
public class FarmerProfileController {
    @Autowired
    private FarmerProfileService farmerService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerFarmer(@RequestBody FarmerProfile farmer) {
        try {
            FarmerProfile savedFarmer = farmerService.registerFarmer(farmer);
            return ResponseEntity.ok(savedFarmer);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Server error: " + e.getMessage() + "\"}");
        }
    }
}
