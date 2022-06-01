package com.licenta.demo.service;

import com.licenta.demo.model.Lucrare;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LucrareService {

     List<Lucrare> findAll();

     Lucrare findById(int id);

     List<Lucrare> findAllByStudentId(int studentId);

     void save(MultipartFile file);
}
