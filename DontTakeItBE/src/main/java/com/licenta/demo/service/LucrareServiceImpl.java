package com.licenta.demo.service;

import com.licenta.demo.exceptions.NotFoundException;
import com.licenta.demo.exceptions.WrongFileUploadedException;
import com.licenta.demo.model.Lucrare;
import com.licenta.demo.model.LucrareSimilara;
import com.licenta.demo.model.Student;
import com.licenta.demo.repository.LucrareRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.text.similarity.LevenshteinDistance;

import javax.transaction.Transactional;
import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class LucrareServiceImpl implements LucrareService {

    @Value("${pdf.pc.path}")
    private String pdfPcPath;

    @Value("${pdf.server.path}")
    private String pdfServerPath;

    private static final DecimalFormat dfZero = new DecimalFormat("0.00");

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
    public String save(MultipartFile file, Integer studentId) throws IOException {

        if (null == file.getOriginalFilename()) {
            throw new WrongFileUploadedException("Lucrarea nu s-a putut incarca. Asigura-te ca totul este in regula.");
        }

            //saving the file on the server computer
            byte[] bytes = file.getBytes();
            Path filename = Paths.get(file.getOriginalFilename());
            Path fullPath = Path.of(pdfPcPath, filename.toString());
            OutputStream outputStream = new FileOutputStream(new File(pdfPcPath, filename.toString()));
            outputStream.write(bytes);
            outputStream.close();

            //saving the file path and other details in DB
            Student student = studentService.findById(studentId);

            Lucrare lucrare = Lucrare.builder()
                    .nume(file.getOriginalFilename())
                    .dataDepunerii(LocalDateTime.now())
                    .nota(null)
                    .pathFileName(fullPath.toString())
                    .serverPath(pdfServerPath + file.getOriginalFilename())
                    .student(student)
                    .build();

            lucrareRepository.save(lucrare);

        return "Lucrare incarcata cu succes!";

    }

    @Override
    public void seteazaNota(Integer id, Integer nota) {

        Lucrare lucrare = this.findById(id);
        lucrare.setNota(nota);
        lucrareRepository.save(lucrare);

    }

    @Override
    public Double comparaLucrarile(Integer id1, Integer id2) throws IOException {

        Lucrare lucrare1 = this.findById(id1);
        Lucrare lucrare2 = this.findById(id2);

        PDFTextStripper stripper = new PDFTextStripper();
        PDDocument pdf1 = PDDocument.load(new File(lucrare1.getPathFileName()));
        PDDocument pdf2 = PDDocument.load(new File(lucrare2.getPathFileName()));
        String textPdf1 = stripper.getText(pdf1);
        String textPdf2 = stripper.getText(pdf2);

        Double rezultat = calculeazaProcentul(textPdf1, textPdf2) * 100;
        dfZero.format(rezultat);

        return rezultat;

    }
    @Override
    public  LucrareSimilara comparaLucrararea(Integer id1) throws IOException {

        Lucrare lucrare = this.findById(id1);
        LucrareSimilara lucrareSimilara = new LucrareSimilara(null, 0d);

        List<Student> studenti = this.studentService
                .findAll()
                .stream()
                .filter(s -> s.getSpecializare().equals(lucrare.getStudent().getSpecializare())).collect(Collectors.toList());

        studenti.forEach(student -> {
            if (!student.getId().equals(lucrare.getStudent().getId())) {
                student.getLucrari().forEach(l -> {
                    try {
                        if (lucrareSimilara.getProcentDeSimilaritate() < this.comparaLucrarile(id1, l.getId())) {
                            lucrareSimilara.setProcentDeSimilaritate(this.comparaLucrarile(id1, l.getId()));
                            lucrareSimilara.setId(l.getId());
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });
            }
        });

        return lucrareSimilara;
    }

    public static double calculeazaProcentul(String first, String second) {

        double maxLength = Double.max(first.length(), second.length());
        if (maxLength > 0) {
            LevenshteinDistance levenshteinDistance = new LevenshteinDistance();
            return (maxLength - levenshteinDistance.apply(first, second)) / maxLength;
        }
        return 1.0;
    }

}
