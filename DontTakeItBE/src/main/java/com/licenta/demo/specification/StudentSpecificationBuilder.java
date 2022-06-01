package com.licenta.demo.specification;

import com.licenta.demo.model.Student;
import com.sun.istack.NotNull;
import org.springframework.data.jpa.domain.Specification;

import java.util.Locale;
import java.util.Map;

public class StudentSpecificationBuilder {

    enum FilterType {
        NUME, PRENUME, FACULTATE, FINALIZAT, SPECIALIZARE, GRUPA, SUBGRUPA
    }

    public static Specification<Student> build(Map<String, String> params) {
        Specification<Student> spec = null;

        for (var entry : params.entrySet()) {
            switch (FilterType.valueOf(
                    entry.getKey().toUpperCase(Locale.ROOT))) {
                case NUME ->
                        spec = getStudentSpecificationNumeCase(spec, entry);

                case PRENUME ->
                        spec = getStudentSpecificationPrenumeCase(spec, entry);

                case FACULTATE ->
                        spec = getStudentSpecificationFacultateCase(spec, entry);

                case FINALIZAT ->
                        spec = getStudentSpecificationFinalizatCase(spec, entry);

                case SPECIALIZARE ->
                        spec = getStudentSpecificationSpecializareCase(spec, entry);

                case GRUPA ->
                        spec = getStudentSpecificationGrupaCase(spec, entry);

                case SUBGRUPA ->
                        spec = getStudentSpecificationSubGrupaCase(spec, entry);

            }
        }
        return spec;
    }


    @NotNull
    private static Specification<Student> getStudentSpecificationNumeCase(Specification<Student> spec, Map.Entry<String, String> entry) {
        if (spec != null) {
            spec = spec.and(
                    StudentSpecification.numeContains(
                            entry.getValue()));
        } else {
            spec =
                    StudentSpecification.numeContains(
                            entry.getValue());
        }
        return spec;
    }

    @NotNull
    private static Specification<Student> getStudentSpecificationPrenumeCase(Specification<Student> spec, Map.Entry<String, String> entry) {
        if (spec != null) {
            spec = spec.and(
                    StudentSpecification.prenumeContains(
                            entry.getValue()));
        } else {
            spec =
                    StudentSpecification.prenumeContains(
                            entry.getValue());
        }
        return spec;
    }

    @NotNull
    private static Specification<Student> getStudentSpecificationFacultateCase(Specification<Student> spec, Map.Entry<String, String> entry) {
        if (spec != null) {
            spec = spec.and(
                    StudentSpecification.facultateIs(
                            entry.getValue()));
        } else {
            spec =
                    StudentSpecification.facultateIs(
                            entry.getValue());
        }
        return spec;
    }

    @NotNull
    private static Specification<Student> getStudentSpecificationFinalizatCase(Specification<Student> spec, Map.Entry<String, String> entry) {
        if (spec != null) {
            spec = spec.and(
                    StudentSpecification.finalizatIs(
                            entry.getValue()));
        } else {
            spec =
                    StudentSpecification.finalizatIs(
                            entry.getValue());
        }
        return spec;
    }

    @NotNull
    private static Specification<Student> getStudentSpecificationSpecializareCase(Specification<Student> spec, Map.Entry<String, String> entry) {
        if (spec != null) {
            spec = spec.and(
                    StudentSpecification.specializareIs(
                            entry.getValue()));
        } else {
            spec =
                    StudentSpecification.specializareIs(
                            entry.getValue());
        }
        return spec;
    }

    @NotNull
    private static Specification<Student> getStudentSpecificationGrupaCase(Specification<Student> spec, Map.Entry<String, String> entry) {
        if (spec != null) {
            spec = spec.and(
                    StudentSpecification.grupaIs(
                            entry.getValue()));
        } else {
            spec =
                    StudentSpecification.grupaIs(
                            entry.getValue());
        }
        return spec;
    }

    @NotNull
    private static Specification<Student> getStudentSpecificationSubGrupaCase(Specification<Student> spec, Map.Entry<String, String> entry) {
        if (spec != null) {
            spec = spec.and(
                    StudentSpecification.subgrupaIs(
                            entry.getValue()));
        } else {
            spec =
                    StudentSpecification.subgrupaIs(
                            entry.getValue());
        }
        return spec;
    }

}
