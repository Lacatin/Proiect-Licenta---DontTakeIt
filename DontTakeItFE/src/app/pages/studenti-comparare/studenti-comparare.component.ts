import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Lucrare } from '~shared/model/lucrare-model';
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
  lucrariStudent1: Set<string> = new Set();
  lucrariStudent2: Set<string> = new Set();

  procentSimilaritate: string;
  afiseazaSimilaritatea: boolean = false;

  rezultatulComparariiUrl: string = '';
  areFilesComparing: boolean = false;
  filesCompared: boolean = false;

  formGroup: FormGroup;

  studentiNrMatricolAOptions: Observable<string[]> | undefined;
  studentiLucrari1Options: Observable<Set<string>> | undefined;
  studentiNrMatricolBOptions: Observable<string[]> | undefined;
  studentiLucrari2Options: Observable<Set<string>> | undefined;
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

  studentiLucrare1Filter(value: string): Set<string> {
    if (value == null) {
      let studentiLucrare1Temp = this.lucrariStudent1;
      return new Set(...studentiLucrare1Temp);
    } else {
      if (value === "") {
        return this.lucrariStudent1;
      }
      let studentiArray = [...this.lucrariStudent1];
      let studentiLucrare1OptionsTemp = studentiArray.filter(option => option.toLowerCase().includes(value.toLowerCase()));
      return new Set(...studentiLucrare1OptionsTemp);
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

  studentiLucrare2Filter(value: string): Set<string> {
    if (value == null) {
      let studentiLucrare1Temp = this.lucrariStudent2;
      return new Set(...studentiLucrare1Temp);
    } else {
      if (value === "") {
        return this.lucrariStudent2;
      }
      let studentiArray = [...this.lucrariStudent2];
      let studentiLucrare1OptionsTemp = studentiArray.filter(option => option.toLowerCase().includes(value.toLowerCase()));
      return new Set(...studentiLucrare1OptionsTemp);
    }
  }

  public checkIfNrMatricolAIsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.nrMatricolA === "" || dataForm.nrMatricolA === null);
  }

  public checkIfLucrare1IsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.lucrare1 === "" || dataForm.lucrare1 === null);
  }

  public checkIfNrMatricolBIsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.nrMatricolB === "" || dataForm.nrMatricolB === null);
  }

  public checkIfLucrare2IsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.lucrare2 === "" || dataForm.lucrare2 === null);
  }

  resetSpecificFilter(filterName:string): void {
    this.formGroup.controls[filterName].reset();
  }

  resetLucrare1Filter(): void {
    this.formGroup.controls["lucrare1"].reset();
    this.studentiLucrari1Options = EMPTY;
  }

  resetLucrare2Filter(): void {
    this.formGroup.controls["lucrare2"].reset();
    this.studentiLucrari2Options = EMPTY;
  }

  getStudentByNrMatricol(numarMatricol: string) {
    return this.studenti.filter(x => x.numarMatricol === numarMatricol);
  }

  getLucrareAByNume(numeLucrare: string) {
    return this.student1.lucrari.filter(x => x.nume === numeLucrare);
  }

  getLucrareBByNume(numeLucrare: string) {
    return this.student2.lucrari.filter(x => x.nume === numeLucrare);
  }

  submitNrMatricolA() {   

    this.afiseazaSimilaritatea = false;
    this.lucrariStudent1 = new Set();

    if(this.getStudentByNrMatricol(this.formGroup.value['nrMatricolA'])[0] !== null && this.getStudentByNrMatricol(this.formGroup.value['nrMatricolA'])[0] !== undefined) {
      this.student1 = this.getStudentByNrMatricol(this.formGroup.value['nrMatricolA'])[0];
      for(let lucrare of this.student1.lucrari) {
        this.lucrariStudent1.add(lucrare.nume);
      }
      this.studentiLucrari1Options = EMPTY;
      this.initAutocompleteObs();
    } else {
      this.studentiLucrari1Options = EMPTY;
      this.lucrariStudent1 = new Set();
    }

  }

  submitNrMatricolB() {   
    
    this.afiseazaSimilaritatea = false;
    this.lucrariStudent2 = new Set();

    if(this.getStudentByNrMatricol(this.formGroup.value['nrMatricolB'])[0] !== null && this.getStudentByNrMatricol(this.formGroup.value['nrMatricolB'])[0] !== undefined) {
      this.student2 = this.getStudentByNrMatricol(this.formGroup.value['nrMatricolB'])[0];
      for(let lucrare of this.student2.lucrari) {
        this.lucrariStudent2.add(lucrare.nume);
      }
      this.studentiLucrari2Options = EMPTY;
      this.initAutocompleteObs();
    } else {
      this.studentiLucrari2Options = EMPTY;
      this.lucrariStudent2 = new Set();
    }

  }

  submitLucrare1() {
    return this.getLucrareAByNume(this.formGroup.value['lucrare1'])[0];
  }

  submitLucrare2() {
    return this.getLucrareBByNume(this.formGroup.value['lucrare2'])[0];
  }

  submit() {
    let lucrare1: Lucrare = this.submitLucrare1();
    let lucrare2: Lucrare = this.submitLucrare2();

    this.areFilesComparing = true;
    this.restService.comparaLucrari(lucrare1.id, lucrare2.id).subscribe((data: number) => {
      this.procentSimilaritate = data.toString();
      this.areFilesComparing = false;
      this.filesCompared = true;
    });
  }

  afiseazaProcent() {;
    this.afiseazaSimilaritatea = true;
  }

}
