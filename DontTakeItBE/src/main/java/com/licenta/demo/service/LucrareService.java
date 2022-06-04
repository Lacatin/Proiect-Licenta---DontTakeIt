package com.licenta.demo.service;

import com.licenta.demo.model.Lucrare;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface LucrareService {

     List<Lucrare> findAll();

     Lucrare findById(int id);

     String save(MultipartFile file, Integer id) throws IOException;
}
