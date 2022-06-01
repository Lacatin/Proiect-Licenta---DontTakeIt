package com.licenta.demo.service;

import com.licenta.demo.model.Lucrare;
import com.licenta.demo.repository.LucrareRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class LucrareServiceImpl implements LucrareService {

    private final LucrareRepository lucrareRepository;

    @Override
    public List<Lucrare> findAll() {
        return lucrareRepository.findAll();
    }

    @Override
    public Lucrare findById(int id) {
        return lucrareRepository.findById(id).orElseThrow();
    }

    @Override
    public List<Lucrare> findAllByStudentId(int studentId) {
        return null;
    }

    @Override
    public void save(MultipartFile file) {

    }
}
