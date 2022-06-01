package com.licenta.demo.provider;

import com.licenta.demo.model.Student;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface StudentProvider {

    Student findById(int id);

    List<Student> findAll();

    List<Student> findAll(Specification<Student> specification);
}
