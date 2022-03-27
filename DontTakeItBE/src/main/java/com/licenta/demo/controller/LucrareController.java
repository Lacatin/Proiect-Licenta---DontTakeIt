package com.licenta.demo.controller;


import com.licenta.demo.model.Lucrare;
import com.licenta.demo.repository.LucrareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/lucrari")
public class LucrareController {

    @Autowired
    private LucrareRepository lucrareRepository;

    @GetMapping()
    private ResponseEntity<List<Lucrare>> findAll(){

        return new ResponseEntity<>(lucrareRepository.findAll(), HttpStatus.OK);
    }
}
