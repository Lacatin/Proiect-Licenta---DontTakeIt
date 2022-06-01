package com.licenta.demo.service;

import com.licenta.demo.model.Student;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface StudentService {

    Student findById(int id);

    List<Student> findAll();

    Set<Student> filter(Map<String, String> params);
}
