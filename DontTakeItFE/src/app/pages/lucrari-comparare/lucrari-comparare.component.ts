import { Component, OnInit } from '@angular/core';
import { Lucrare } from '~shared/model/lucrare-model';
import { Student } from '~shared/model/student-model';
import { LucrareSimilara } from '~shared/model/lucrare-similara-model';
import { RestService } from '~shared/services/rest-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-lucrari-comparare',
  templateUrl: './lucrari-comparare.component.html',
  styleUrls: ['./lucrari-comparare.component.scss']
})
export class LucrariComparareComponent implements OnInit {

  studenti: Student[] = [];
  student: Student;
  lucrareStudent: Lucrare;
  lucrareSimilara: LucrareSimilara;
  studentCuLucrareSimilara: Student;
  ceaMaiSimilaraLucrare: Lucrare;

  formGroup: FormGroup;

  studentiNrMatricol: string[] = [];
  studentiNrMatricolOptions: Observable<string[]> | undefined;
  lucrariStudent: Set<string> = new Set();
  studentiLucrariOptions: Observable<Set<string>> | undefined;

  afiseazaLucrareaSimilara: boolean = false;
  areFilesComparing: boolean = false;
  filesCompared: boolean = false;

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
      nrMatricol:     [''],
      lucrare:        [''],
    });

    this.initAutocompleteObs();

  }

  initAutocompleteObs() {
    this.studentiNrMatricolOptions = this.formGroup.get('nrMatricol')?.valueChanges.pipe(
      startWith(''),
      map(value => this.studentiNrMatricolFilter(value))
    );

    this.studentiLucrariOptions = this.formGroup.get('lucrare')?.valueChanges.pipe(
      startWith(''),
      map(value => this.studentiLucrareFilter(value))
    );
  }

  studentiNrMatricolFilter(value: string): string[] {
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

  studentiLucrareFilter(value: string): Set<string> {
    if (value == null) {
      let studentiLucrareTemp = this.lucrariStudent;
      return new Set(...studentiLucrareTemp);
    } else {
      if (value === "") {
        return this.lucrariStudent;
      }
      let studentiArray = [...this.lucrariStudent];
      let studentiLucrare1OptionsTemp = studentiArray.filter(option => option.toLowerCase().includes(value.toLowerCase()));
      return new Set(...studentiLucrare1OptionsTemp);
    }
  }

  public checkIfNrMatricolIsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.nrMatricol === "" || dataForm.nrMatricol === null);
  }

  public checkIfLucrareIsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.lucrare === "" || dataForm.lucrare === null);
  }

  resetSpecificFilter(filterName:string): void {
    this.formGroup.controls[filterName].reset();
  }

  resetLucrareFilter(): void {
    this.formGroup.controls["lucrare"].reset();
    this.studentiLucrariOptions = EMPTY;
  }

  getStudentByNrMatricol(numarMatricol: string) {
    return this.studenti.filter(x => x.numarMatricol === numarMatricol);
  }

  getLucrareByNume(numeLucrare: string) {
    return this.student.lucrari.filter(x => x.nume === numeLucrare);
  }

  submitNrMatricol() {   

    this.afiseazaLucrareaSimilara = false;
    this.lucrariStudent = new Set();

    if(this.getStudentByNrMatricol(this.formGroup.value['nrMatricol'])[0] !== null && this.getStudentByNrMatricol(this.formGroup.value['nrMatricol'])[0] !== undefined) {
      this.student = this.getStudentByNrMatricol(this.formGroup.value['nrMatricol'])[0];
      for(let lucrare of this.student.lucrari) {
        this.lucrariStudent.add(lucrare.nume);
      }
      this.studentiLucrariOptions = EMPTY;
      this.initAutocompleteObs();
    } else {
      this.studentiLucrariOptions = EMPTY;
      this.lucrariStudent = new Set();
    }

  }

  submitLucrare() {
    return this.getLucrareByNume(this.formGroup.value['lucrare'])[0];
  }

  submit() {
    let lucrare: Lucrare = this.submitLucrare();

    this.areFilesComparing = true;
    this.restService.comparaLucrare(lucrare.id).subscribe((data: LucrareSimilara) => {
      this.lucrareSimilara = data;
      console.log(this.lucrareSimilara);
      
      this.areFilesComparing = false;
      this.filesCompared = true;
    });

    this.restService.get<Lucrare>('/lucrari/' + this.lucrareSimilara.id).subscribe((data: Lucrare) =>{
      this.ceaMaiSimilaraLucrare = data;
      this.studentCuLucrareSimilara = this.ceaMaiSimilaraLucrare.student;
    })
  }

  afiseazaLucrarea() {;
    this.afiseazaLucrareaSimilara = true;
  }

}
