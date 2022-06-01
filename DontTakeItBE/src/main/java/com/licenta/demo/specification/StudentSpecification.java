package com.licenta.demo.specification;

import com.licenta.demo.model.Student;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class StudentSpecification {

    public static Specification<Student> numeContains (String nume) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("nume")), "%" + nume.toLowerCase() + "%");
    }

    public static Specification<Student> prenumeContains (String prenume) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("prenume")), "%" + prenume.toLowerCase() + "%");
    }

    public static Specification<Student> facultateIs (String facultate) {
        return  (root, query, criteriaBuilder) -> criteriaBuilder.in(root.get("facultate")).value(facultate);
    }

    public static Specification<Student> finalizatIs (String finalizat) {
        return  (root, query, criteriaBuilder) -> criteriaBuilder.in(root.get("finalizat")).value(finalizat);
    }

    public static Specification<Student> specializareIs (String specializare) {
        return  (root, query, criteriaBuilder) -> criteriaBuilder.in(root.get("specializare")).value(specializare);
    }

    public static Specification<Student> grupaIs (String grupa) {
        return  (root, query, criteriaBuilder) -> criteriaBuilder.in(root.get("grupa")).value(grupa);
    }

    public static Specification<Student> subgrupaIs(String subGrupa) {
        return  (root, query, criteriaBuilder) -> criteriaBuilder.in(root.get("subgrupa")).value(subGrupa);
    }

}
