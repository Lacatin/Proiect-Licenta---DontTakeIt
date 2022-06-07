package com.licenta.demo.controller;

import com.licenta.demo.model.Student;
import com.licenta.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/studenti")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping()
    private ResponseEntity<List<Student>> findAll(){
        return new ResponseEntity<>(studentService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Student> findById(@PathVariable int id) {
        return new ResponseEntity<>(studentService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/filtered")
    private ResponseEntity<Set<Student>> findAllFiltered(@RequestParam Map<String, String> params){
        return new ResponseEntity<>(studentService.filter(params), HttpStatus.OK);
    }
}
