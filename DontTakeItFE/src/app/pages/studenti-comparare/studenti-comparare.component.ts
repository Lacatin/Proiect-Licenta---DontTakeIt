import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Student } from '~shared/model/student-model';
import { RestService } from '~shared/services/rest-service';

@Component({
  selector: 'app-studenti-comparare',
  templateUrl: './studenti-comparare.component.html',
  styleUrls: ['./studenti-comparare.component.scss']
})
export class StudentiComparareComponent implements OnInit {

  studenti: Student[] = [];

  student1: Student;
  student2: Student;
  lucrariStudent1: string[] = [];
  lucrariStudent2: string[] = [];

  formGroup: FormGroup;

  studentiNrMatricolAOptions: Observable<string[]> | undefined;
  studentiLucrari1Options: Observable<string[]> | undefined;
  studentiNrMatricolBOptions: Observable<string[]> | undefined;
  studentiLucrari2Options: Observable<string[]> | undefined;
  studentiNrMatricol: string[] = [];

  constructor(
    private restService: RestService,
    private formBuilder: FormBuilder,
    ) 
    { 

    }

  ngOnInit(): void {

    this.restService.get<Student[]>('/studenti').subscribe((data: Student[]) => {
      this.studenti = data;

      for (let student of data) {
        this.studentiNrMatricol.push(student.numarMatricol);
      }
        
    });

    this.formGroup = this.formBuilder.group({
      nrMatricolA:     [''],
      lucrare1:        [''],
      nrMatricolB:     [''],
      lucrare2:        [''],
    });

    this.initAutocompleteObs();

  }

  initAutocompleteObs() {

    this.studentiNrMatricolAOptions = this.formGroup.get('nrMatricolA')?.valueChanges.pipe(
      startWith(''),
      map(value => this.studentiNrMatricolAFilter(value))
    );

    this.studentiLucrari1Options = this.formGroup.get('lucrare1')?.valueChanges.pipe(
      startWith(''),
      map(value => this.studentiLucrare1Filter(value))
    );

    this.studentiNrMatricolBOptions = this.formGroup.get('nrMatricolB')?.valueChanges.pipe(
      startWith(''),
      map(value => this.studentiNrMatricolBFilter(value))
    );

    this.studentiLucrari2Options = this.formGroup.get('lucrare2')?.valueChanges.pipe(
      startWith(''),
      map(value => this.studentiLucrare2Filter(value))
    );

  }

  studentiNrMatricolAFilter(value: string): string[] {
    if (value == null) {
      let studentiNrMatricolTemp = this.studentiNrMatricol;
      return studentiNrMatricolTemp;
    } else {
      if (value === "") {
        return this.studentiNrMatricol;
      }
      let studentiArray = [...this.studentiNrMatricol];
      let studentiNrMatricolOptionsTemp = studentiArray.filter(option => option.toLowerCase().includes(value.toLowerCase()));
      return studentiNrMatricolOptionsTemp;
    }
  }

  studentiLucrare1Filter(value: string): string[] {
    if (value == null) {
      let studentiLucrare1Temp = this.lucrariStudent1;
      return studentiLucrare1Temp;
    } else {
      if (value === "") {
        return this.lucrariStudent1;
      }
      let studentiArray = [...this.lucrariStudent1];
      let studentiLucrare1OptionsTemp = studentiArray.filter(option => option.toLowerCase().includes(value.toLowerCase()));
      return studentiLucrare1OptionsTemp;
    }
  }

  studentiNrMatricolBFilter(value: string): string[] {
    if (value == null) {
      let studentiNrMatricolTemp = this.studentiNrMatricol;
      return studentiNrMatricolTemp;
    } else {
      if (value === "") {
        return this.studentiNrMatricol;
      }
      let studentiArray = [...this.studentiNrMatricol];
      let studentiNrMatricolOptionsTemp = studentiArray.filter(option => option.toLowerCase().includes(value.toLowerCase()));
      return studentiNrMatricolOptionsTemp;
    }
  }

  studentiLucrare2Filter(value: string): string[] {
    if (value == null) {
      let studentiLucrare1Temp = this.lucrariStudent2;
      return studentiLucrare1Temp;
    } else {
      if (value === "") {
        return this.lucrariStudent2;
      }
      let studentiArray = [...this.lucrariStudent2];
      let studentiLucrare1OptionsTemp = studentiArray.filter(option => option.toLowerCase().includes(value.toLowerCase()));
      return studentiLucrare1OptionsTemp;
    }
  }

  public checkIfNrMatricolAIsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.nrMatricolA === "" || dataForm.nrMatricolA === null);
  }

  public checkIfLucrari1IsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.lucrare1 === "" || dataForm.lucrare1 === null);
  }

  public checkIfNrMatricolBIsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.nrMatricolB === "" || dataForm.nrMatricolB === null);
  }

  public checkIfLucrari2IsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.lucrare2 === "" || dataForm.lucrare2 === null);
  }

  resetSpecificFilter(filterName:string): void {
    this.formGroup.controls[filterName].reset();
  }

  getStudentByNrMatricol(numarMatricol: string) {
    return this.studenti.filter(x => x.numarMatricol === numarMatricol);
  }

  submitNrMatricolA() {   

    if(this.getStudentByNrMatricol(this.formGroup.value['nrMatricolA'])[0] !== null && this.getStudentByNrMatricol(this.formGroup.value['nrMatricolA'])[0] !== undefined) {
      this.student1 = this.getStudentByNrMatricol(this.formGroup.value['nrMatricolA'])[0];
      for(let lucrare of this.student1.lucrari) {
        this.lucrariStudent1.push(lucrare.nume);
      }
      
      this.initAutocompleteObs();
    } else {
      this.lucrariStudent1 = [];
    }

  }

  submitNrMatricolB() {   
    
    if(this.getStudentByNrMatricol(this.formGroup.value['nrMatricolB'])[0] !== null && this.getStudentByNrMatricol(this.formGroup.value['nrMatricolB'])[0] !== undefined) {
      this.student2 = this.getStudentByNrMatricol(this.formGroup.value['nrMatricolB'])[0];
      for(let lucrare of this.student2.lucrari) {
        this.lucrariStudent2.push(lucrare.nume);
      }
      
      this.initAutocompleteObs();
    } else {
      this.lucrariStudent2 = [];
    }

  }

  submit() {

  }

}
