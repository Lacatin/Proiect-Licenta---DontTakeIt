import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlertPopUpComponent } from '~shared/alert-pop-up/alert-pop-up.component';
import { Student } from '~shared/model/student-model';
import { RestService } from '~shared/services/rest-service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-studenti-page',
  templateUrl: './studenti-page.component.html',
  styleUrls: ['./studenti-page.component.scss']
})
export class StudentiPageComponent implements OnInit {

  student: Student;
  studentId: string;
  url: string = "/studenti/";
  
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';
  isFileLoading: Boolean = false;

  constructor(
    private restService: RestService,
    private route: ActivatedRoute,
    public dialog: MatDialog
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
        console.log(this.student);
      }
    )
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


}

