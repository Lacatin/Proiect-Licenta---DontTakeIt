package com.licenta.demo.controller;


import com.licenta.demo.model.Lucrare;
import com.licenta.demo.repository.LucrareRepository;
import com.licenta.demo.service.LucrareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/lucrari")
public class LucrareController {

    @Autowired
    private LucrareService lucrareService;

    @GetMapping()
    private ResponseEntity<List<Lucrare>> findAll(){
        return new ResponseEntity<>(lucrareService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{lucrareId}")
    private ResponseEntity<Lucrare> findById(@PathVariable int lucrareId){
        return new ResponseEntity<>(lucrareService.findById(lucrareId), HttpStatus.OK);
    }

    @PostMapping("/{studentId}")
    private ResponseEntity<String> save(@RequestParam MultipartFile file, @PathVariable Integer studentId) throws IOException {
        return new ResponseEntity<>(lucrareService.save(file, studentId), HttpStatus.OK);
    }
}
