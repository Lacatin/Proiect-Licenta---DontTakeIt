import { Student } from "./student-model";


export class Lucrare{
    id:             number;
    nume:           string;
    continut:       string;
    dataDepunerii:  string;
    nota:           number;
    student:        Student;


    constructor(id: number,
                nume: string,
                continut: string,
                dataDepunerii: string,
                nota: number,
                student: Student) {

        this.id = id;
        this.nume = nume;
        this.continut = continut;
        this.dataDepunerii = dataDepunerii;
        this.nota = nota;
        this.student = student;
    }
    
}