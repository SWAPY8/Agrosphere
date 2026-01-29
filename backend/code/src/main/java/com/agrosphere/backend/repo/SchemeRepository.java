package com.agrosphere.backend.repo;

import com.agrosphere.backend.entity.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchemeRepository extends JpaRepository<Scheme, Long> {

    List<Scheme> findByRegionContainingIgnoreCase(String region);

    List<Scheme> findByCropsContainingIgnoreCase(String crop);
}

