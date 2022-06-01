package com.licenta.demo.service;

import com.licenta.demo.exceptions.NotFoundException;
import com.licenta.demo.exceptions.WrongFileUploadedException;
import com.licenta.demo.model.Lucrare;
import com.licenta.demo.model.Student;
import com.licenta.demo.repository.LucrareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class LucrareServiceImpl implements LucrareService {

    @Value("${pdf.path}")
    private String pdfPath;

    private final LucrareRepository lucrareRepository;
    private final StudentServiceImpl studentService;

    @Override
    public List<Lucrare> findAll() {
        return lucrareRepository.findAll();
    }

    @Override
    public Lucrare findById(int id) {
        return lucrareRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Nu s-a putut gasi lucrarea cu ID-ul: " + id)
        );
    }

    @Override
    public String save(MultipartFile file, int studentId) throws IOException {

        if (null == file.getOriginalFilename()) {
            throw new WrongFileUploadedException("Lucrarea nu s-a putut incarca. Asigura-te ca totul este in regula.");
        }

            //saving the file on the server computer
            byte[] bytes = file.getBytes();
            Path filename = Paths.get(file.getOriginalFilename());
            Path fullPath = Path.of(pdfPath, filename.toString());
            Files.write(fullPath, bytes);

            //saving the file path and other details in DB
            Student student = studentService.findById(studentId);

            Lucrare lucrare = Lucrare.builder()
                    .nume(file.getOriginalFilename())
                    .dataDepunerii(LocalDateTime.now())
                    .nota(null)
                    .pathFileName(fullPath.toString())
                    .student(student)
                    .build();

            lucrareRepository.save(lucrare);

        return "Lucrare incarcata cu succes!";

    }
}
