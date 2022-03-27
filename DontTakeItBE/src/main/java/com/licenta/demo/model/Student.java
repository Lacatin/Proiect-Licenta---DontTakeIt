package com.licenta.demo.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "studenti")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Integer id;

    @Column(name = "nume")
    private String nume;

    @Column(name = "prenume")
    private String prenume;

    @Column(name = "an_de_studiu")
    private Integer anDeStudiu;

    @Column(name = "specializare")
    private String specializare;

    @Column(name = "grupa")
    private String grupa;

    @Column(name = "subgrupa")
    private String subgrupa;

    @Column(name = "numar_matricol")
    private String numarMatricol;

    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Lucrare> lucrari;
}