package com.agrosphere.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "schemes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Scheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Govt / internal scheme code
    @Column(unique = true)
    private String schemeCode;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    // Eligibility in readable text (safe for now)
    @Column(columnDefinition = "TEXT")
    private String eligibility;

    @Column(columnDefinition = "TEXT")
    private String benefits;

    // Central / State
    private String schemeType;

    // Ministry name
    private String ministry;

    // Maharashtra,All OR All
    private String region;

    // Wheat,Rice,All
    private String crops;

    // Online / Offline / Both
    private String applicationMode;

    @Column(columnDefinition = "TEXT")
    private String documentsRequired;

    // Official application URL
    private String applyLink;

    private Boolean active = true;

    private LocalDateTime createdAt = LocalDateTime.now();
}
