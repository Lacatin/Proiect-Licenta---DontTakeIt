import { Student } from "./student-model";


export class Lucrare {
    id:             number;
    nume:           string;
    pathFileName:   string;
    serverPath:     string;
    dataDepunerii:  string;
    nota:           number;
    student:        Student;


    constructor(id: number,
                nume: string,
                pathFileName: string,
                serverPath: string, 
                dataDepunerii: string,
                nota: number,
                student: Student) {

        this.id = id;
        this.nume = nume;
        this.pathFileName = pathFileName;
        this.dataDepunerii = dataDepunerii;
        this.nota = nota;
        this.student = student;
        this.serverPath = serverPath;
    }
    
}