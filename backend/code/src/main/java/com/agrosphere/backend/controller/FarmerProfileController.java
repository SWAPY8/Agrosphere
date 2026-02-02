package com.agrosphere.backend.controller;

import com.agrosphere.backend.entity.FarmerProfile;
import com.agrosphere.backend.service.FarmerProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;


@RestController
@RequestMapping("/api/farmer")
//@CrossOrigin(origins = "http://localhost:5173")
public class FarmerProfileController {
    @Autowired
    private FarmerProfileService farmerService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerFarmer(@RequestBody FarmerProfile farmer) {

        Map<String, Object> response = new HashMap<>();

        try {
            FarmerProfile savedFarmer = farmerService.registerFarmer(farmer);

            response.put("success", true);
            response.put("id", savedFarmer.getId());
            response.put("message", "Profile created successfully");

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Server error: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
