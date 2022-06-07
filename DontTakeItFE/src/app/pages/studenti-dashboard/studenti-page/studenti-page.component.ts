import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlertPopUpComponent } from '~shared/alert-pop-up/alert-pop-up.component';
import { Student } from '~shared/model/student-model';
import { RestService } from '~shared/services/rest-service';
import {saveAs} from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Lucrare } from '~shared/model/lucrare-model';

@Component({
  selector: 'app-studenti-page',
  templateUrl: './studenti-page.component.html',
  styleUrls: ['./studenti-page.component.scss']
})
export class StudentiPageComponent implements OnInit {

  student: Student;
  studentId: string;
  numeLucrariStudent: string[] = [];

  url: string = "/studenti/";

  formGroup: FormGroup;
  
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';
  isFileLoading: Boolean = false;

  constructor(
    private restService: RestService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      paramMap => {
          this.studentId = paramMap.get('id')!;
      }
    );

    this.url += this.studentId;

    this.restService.get<Student>(this.url).subscribe(
      (data:Student) => {
        this.student = data;

        for (let l of this.student.lucrari) {
          this.numeLucrariStudent.push(l.nume);
        }
    
        this.formGroup = this.formBuilder.group({
          ...this.numeLucrariStudent,
        });

        this.formGroup.reset();

      }
    );
  }

  openDialog(status: string, message: string) {
    let dialogRef = this.dialog.open(AlertPopUpComponent);
    dialogRef.componentInstance.status = status;
    dialogRef.componentInstance.message = message;
  }

  upload(): void {
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.restService.upload(this.currentFile, this.studentId).subscribe(
          (event: any) => {
            if (event instanceof HttpResponse) {
              this.isFileLoading = false;
              const file = event.body;
              if (event.status !== 200)
                this.errorMsg = "Fisierul nu s-a putut incarca";
              else
                this.message = "Lucrare incarcata cu succes!";
            }
          },
          (err: any) => {

            if (err.error && err.error.responseMessage) {
              this.errorMsg = err.error.responseMessage;
            } else {
              this.errorMsg = 'Error occurred while uploading a file!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }

  public checkIfFormIsEmpty(i: number): boolean {
    let dataForm = this.formGroup.value;
    return (dataForm[i] === "" || dataForm[i] === null)
  }

  trimiteNota(lucrare: Lucrare, i: number) {

    console.log(this.formGroup);

    let nota: string  = this.formGroup.controls[i].value

    console.log(nota);
    

    this.restService.seteazaNota(lucrare.id, nota).subscribe(
      data => this.openDialog("Succes!", "Ati setat nota " + nota + " lucrarii " + lucrare.nume +". Pentru a vedea schimbarile in pagina, dati refresh."),
      error => this.openDialog("Eroare!", "Nota nu s-a putut seta! Incercati din nou!")
    )
  }

  sanitize(url:string){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
}

counter(i: number) {
  return new Array(i);
}



}

