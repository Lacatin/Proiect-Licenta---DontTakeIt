package com.licenta.demo.provider;

import com.licenta.demo.model.Student;
import com.licenta.demo.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class StudentProviderImpl implements StudentProvider {

    private final StudentRepository studentRepository;


    @Override
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Override
    public List<Student> findAll(Specification<Student> specification) {
        return studentRepository.findAll(specification);
    }
}
