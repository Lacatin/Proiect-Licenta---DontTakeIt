import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlertPopUpComponent } from '~shared/alert-pop-up/alert-pop-up.component';
import { RestService } from '~shared/services/rest-service';

@Component({
  selector: 'app-import-lucrare',
  templateUrl: './import-lucrare.component.html',
  styleUrls: ['./import-lucrare.component.scss']
})


export class ImportLucrareComponent implements OnInit {

  fileAttr = '';
  selectedFiles?: FileList;
  isFileLoading: boolean = false;
  currentFile?: File;
  message = '';
  errorMsg = '';

  studentId: string;

  @ViewChild('fileUpload') inputValue: any;

  constructor(private restService: RestService, public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      paramMap => {
          this.studentId = paramMap.get('id')!;
      }
    );
    
  }

  openDialog(status: string, message: string) {
    let dialogRef = this.dialog.open(AlertPopUpComponent);
    dialogRef.componentInstance.status = status;
    dialogRef.componentInstance.message = message;
  }

  selectFile(event: any): void {
    this.isFileLoading = true;
    this.selectedFiles = event.target.files;
    this.upload();
    this.inputValue.nativeElement.value = '';
  }

  upload(): void {
    this.errorMsg = '';
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.fileAttr = file.name;
        this.restService.upload(this.currentFile, this.studentId).subscribe(
          (event: any) => {
            if (event instanceof HttpResponse) {
              if (event.ok) {
                this.message = "Lucrare incarcata cu succes!";
                this.openDialog("Success", this.message);
                this.isFileLoading = false;
              }
            }
          },
          (err: any) => {
                this.message = "Lucrarea nu s-a putut incarca!";
                this.openDialog("Error", this.message);
                this.currentFile = undefined;
                this.isFileLoading = false;
          });
      }
      this.selectedFiles = undefined;
    }
  }

}
