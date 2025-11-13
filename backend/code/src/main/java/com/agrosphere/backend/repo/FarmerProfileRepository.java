package com.agrosphere.backend.repo;

import com.agrosphere.backend.entity.FarmerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FarmerProfileRepository extends JpaRepository<FarmerProfile,Long> {
    Optional<FarmerProfile> findByEmail(String email);
}
