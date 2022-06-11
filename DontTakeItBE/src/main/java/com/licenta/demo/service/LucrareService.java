package com.licenta.demo.service;

import com.licenta.demo.model.Lucrare;
import com.licenta.demo.model.LucrareSimilara;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

public interface LucrareService {

     List<Lucrare> findAll();

     Lucrare findById(int id);

     String save(MultipartFile file, Integer id) throws IOException;

     void seteazaNota(Integer id, Integer nota);

     Double comparaLucrarile(Integer id1, Integer id2) throws IOException;

     LucrareSimilara comparaLucrararea(Integer id1) throws IOException;

}
