package com.licenta.demo.controller;


import com.licenta.demo.model.Lucrare;
import com.licenta.demo.model.LucrareSimilara;
import com.licenta.demo.service.LucrareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
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

    @PostMapping("/{lucrareId}/{nota}")
    private void seteazaNota(@PathVariable Integer lucrareId, @PathVariable String nota) throws IOException {
        lucrareService.seteazaNota(lucrareId, Integer.valueOf(nota));
    }

    @GetMapping("/comparare-lucrari")
    private ResponseEntity<Double> comparaLucari(@RequestParam Integer id1, @RequestParam Integer id2) throws IOException {
        return new ResponseEntity<>(lucrareService.comparaLucrarile(id1, id2), HttpStatus.OK);
    }

    @GetMapping("/comparare-lucrare")
    private ResponseEntity<LucrareSimilara> comparaLucare(@RequestParam Integer id1) throws IOException {
        return new ResponseEntity<>(lucrareService.comparaLucrararea(id1), HttpStatus.OK);
    }

}
