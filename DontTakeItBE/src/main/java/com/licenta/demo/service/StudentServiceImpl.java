package com.licenta.demo.service;


import com.licenta.demo.model.Student;
import com.licenta.demo.provider.StudentProvider;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static com.licenta.demo.specification.StudentSpecificationBuilder.build;

@Service
@AllArgsConstructor
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentProvider studentProvider;

    @Override
    public Student findById(int id) {
        return studentProvider.findById(id);
    }

    @Override
    public List<Student> findAll() {
        return studentProvider.findAll();
    }



    @Override
    public Set<Student> filter(Map<String, String> params) {
        return new HashSet<>(studentProvider.findAll(build(params)));
    }

}
