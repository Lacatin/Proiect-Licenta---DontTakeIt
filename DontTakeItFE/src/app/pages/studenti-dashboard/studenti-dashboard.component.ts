import { Component, OnInit, ViewChild } from '@angular/core';
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
export class StudentiDashboardComponent implements OnInit {

studenti: Set<Student> = new Set();

formGroup: FormGroup;
studentiNumeOptions: Observable<string[]> | undefined;
studentiNume: string[] = [];
studentiPrenumeOptions: Observable<string[]> | undefined;
studentiPrenume: string[] = [];
studentiSpecializare: Set<string> = new Set();

dataSource: MatTableDataSource<Student>;
columnsToDisplay: string[] = ['nume', 'prenume', 'specializare', 'anDeStudiu', 'grupa', 'subgrupa', 'numarMatricol', 'lucrari'];

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    private restService: RestService,
    private formBuilder: FormBuilder,
    ) 
    { 

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
      }
      this.sortFilters();
    });

    this.formGroup = this.formBuilder.group({
      nume:           [''],
      prenume:        [''],
      specializare:   [''],
      an:             [''],
      grupa:          [''],
      subgrupa:       [''],
      numarMatricol:  [''],
      lucrari:        [''],
    });

    this.initAutocompleteObs();

  }

  submitFiltering() {

  }

  public checkIfNumeIsEmpty(): boolean{
    let dataForm = this.formGroup.value;
    return !(dataForm.nume === "" || dataForm.nume === null);
  }

  public checkIfPrenumeIsEmpty(): boolean{
    let dataForm = this.formGroup.value;
    return !(dataForm.prenume === "" || dataForm.prenume === null);
  }

  public checkIfSpecializreIsEmpty(): boolean{
    let dataForm = this.formGroup.value;
    return !(dataForm.specializare === "" || dataForm.specializare === null);
  }

  resetSpecificFilter(filterName:string): void {
    this.formGroup.controls[filterName].reset();
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
  }

}
