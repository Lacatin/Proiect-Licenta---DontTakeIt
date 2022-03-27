package com.licenta.demo.controller;

import com.licenta.demo.model.Student;
import com.licenta.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/studenti")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping()
    private ResponseEntity<List<Student>> findAll(){
        return new ResponseEntity<>(studentRepository.findAll(), HttpStatus.OK);
    }
}
