package com.licenta.demo.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lucrari")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Lucrare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lucrare_id")
    private Integer id;

    @Column(name = "nume")
    private String nume;

    @Column(name = "continut")
    private byte[] continut;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;

    @Column(name = "data_depunerii")
    private LocalDateTime dataDepunerii;

    @Column(name = "nota")
    private Integer nota;
}
