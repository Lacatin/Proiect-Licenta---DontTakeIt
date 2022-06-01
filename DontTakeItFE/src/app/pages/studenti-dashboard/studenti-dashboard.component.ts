import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { List } from 'lodash';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Student } from '~shared/model/student-model';
import { RestService } from '~shared/services/rest-service';

@Component({
  selector: 'app-studenti-dashboard',
  templateUrl: './studenti-dashboard.component.html',
  styleUrls: ['./studenti-dashboard.component.scss']
})
export class StudentiDashboardComponent implements OnInit, AfterViewInit {

studenti: Set<Student> = new Set();

formGroup: FormGroup;
studentiNumeOptions: Observable<string[]> | undefined;
studentiNume: string[] = [];
studentiPrenumeOptions: Observable<string[]> | undefined;
studentiPrenume: string[] = [];
studentiSpecializare: Set<string> = new Set();
studentiGrupa: Set<string> = new Set();
studentiSubgrupa: Set<string> = new Set();
studentiFacultate: Set<string> = new Set();
studentiFinalizat: Set<boolean> = new Set();

dataSource: MatTableDataSource<Student>;
columnsToDisplay: string[] = ['nume', 'prenume', 'facultate', 'specializare', 'anDeStudiu', 'grupa', 'subgrupa', 'finalizat', 'numarMatricol', 'lucrari'];

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    private restService: RestService,
    private formBuilder: FormBuilder,
    ) 
    { 

    }
  ngAfterViewInit(): void {
    this.resetSort();
  }

  ngOnInit(): void {
    
    this.dataSource = new MatTableDataSource<Student>([]);

    this.restService.get<Student[]>('/studenti').subscribe((data: Student[]) => {
      this.dataSource.data = data;
      for (const student of data) {
        this.studenti.add(student);
        this.studentiNume.push(student.nume);
        this.studentiPrenume.push(student.prenume);
        this.studentiSpecializare.add(student.specializare)
        this.studentiGrupa.add(student.grupa);
        this.studentiSubgrupa.add(student.subgrupa);
        this.studentiFacultate.add(student.facultate);
        this.studentiFinalizat.add(student.finalizat);
      }
      this.sortFilters();
    });

    this.formGroup = this.formBuilder.group({
      nume:           [''],
      prenume:        [''],
      facultate:      [''],
      specializare:   [''],
      an:             [''],
      grupa:          [''],
      subgrupa:       [''],
      finalizat:   [''],
      numarMatricol:  [''],
      lucrari:        [''],
    });

    this.initAutocompleteObs();

  }

  submitFiltering() {

    this.initAutocompleteObs();
    const urlString: string = '/studenti/filtered?';

    const data = this.formGroup.value;

    const params = Object.keys(this.formGroup.value).map(function (key) {
      if (data[key] !== '' && data[key] !== null)
        return [key, data[key]].map(encodeURIComponent).join("=");
      else return null;
    }).filter((data) => {
      return data
    }).join("&");

    this.restService.get<Student[]>(urlString + params).subscribe(
      (data:Student[]) => {
        this.dataSource.data = data;
      }
    );

  }

  public checkIfNumeIsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.nume === "" || dataForm.nume === null);
  }

  public checkIfPrenumeIsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.prenume === "" || dataForm.prenume === null);
  }

  public checkIfSpecializreIsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.specializare === "" || dataForm.specializare === null);
  }

  public checkIfGrupaIsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.grupa === "" || dataForm.grupa === null);
  }

  public checkIfSubgrupaIsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.subgrupa === "" || dataForm.subgrupa === null);
  }

  public checkIfFacultateIsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.facultate === "" || dataForm.facultate === null);
  }

  public checkIfFinalizatIsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return !(dataForm.finalizat === "" || dataForm.finalizat === null);
  }

  public checkIfFormIsEmpty(): boolean {
    let dataForm = this.formGroup.value;
    return (dataForm.nume === "" || dataForm.nume === null)
      && (dataForm.prenume === "" || dataForm.prenume === null)
      && (dataForm.facultate === "" || dataForm.facultate === null)
      && (dataForm.finalizat === "" || dataForm.finalizat === null)
      && (dataForm.specializare === "" || dataForm.specializare === null)
      && (dataForm.grupa === "" || dataForm.grupa === null)
      && (dataForm.subgrupa === "" || dataForm.subgrupa === null);
  }

  resetSpecificFilter(filterName:string): void {
    this.formGroup.controls[filterName].reset();
    this.submitFiltering();
  }

  resetFiltering(): void {
    this.formGroup.reset();
    this.initAutocompleteObs();
    this.resetSort();
    this.restService.get<Student[]>('/studenti')
      .subscribe((data: Student[]) => {
        this.dataSource.data = data;
      })
  }

  private resetSort() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public studentiNumeFilter(value: string): string[] {
    if (value == null) {
      let studentiNumeTemp = this.studentiNume;
      return studentiNumeTemp;
    } else {
      if (value === "") {
        return this.studentiNume;
      }
      let studentiArray = [...this.studentiNume];
      let studentiNumeOptionsTemp = studentiArray.filter(option => option.toLowerCase().includes(value.toLowerCase()));
      return studentiNumeOptionsTemp;
    }
  }

  public studentiPrenumeFilter(value: string): string[] {
    if (value == null) {
      let studentiPrenumeTemp = this.studentiPrenume;
      return studentiPrenumeTemp;
    } else {
      if (value === "") {
        return this.studentiPrenume;
      }
      let studentiArray = [...this.studentiPrenume];
      let studentiPrenumeOptionsTemp = studentiArray.filter(option => option.toLowerCase().includes(value.toLowerCase()));
      return studentiPrenumeOptionsTemp;
    }
  }

  public initAutocompleteObs() {

    this.studentiNumeOptions = this.formGroup.get('nume')?.valueChanges.pipe(
      startWith(''),
      map(value => this.studentiNumeFilter(value))
    );

    this.studentiPrenumeOptions = this.formGroup.get('prenume')?.valueChanges.pipe(
      startWith(''),
      map(value => this.studentiPrenumeFilter(value))
    );

  }

  sortFilters() {
    //sortarea specializarii studentilor
    let studentiSpecializareTemp = [...this.studentiSpecializare];
    studentiSpecializareTemp.sort();
    this.studentiSpecializare = new Set (studentiSpecializareTemp);

    //sortarea grupelor studentilor
    let studentiGrupaTemp = [...this.studentiGrupa];
    studentiGrupaTemp.sort();
    this.studentiGrupa = new Set (studentiGrupaTemp);

    //sortarea subgrupelor studentilor
    let studentiSubgrupaTemp = [...this.studentiSubgrupa];
    studentiSubgrupaTemp.sort();
    this.studentiSubgrupa = new Set (studentiSubgrupaTemp);

    //sortarea facultatilor studentilor
    let studentiFacultatiTemp = [...this.studentiFacultate];
    studentiFacultatiTemp.sort();
    this.studentiFacultate = new Set (studentiFacultatiTemp);

    //sortarea finalizari studentilor
    let studentiFinalizatTemp = [...this.studentiFinalizat];
    studentiFinalizatTemp.sort();
    this.studentiFinalizat = new Set (studentiFinalizatTemp);
  }

}
