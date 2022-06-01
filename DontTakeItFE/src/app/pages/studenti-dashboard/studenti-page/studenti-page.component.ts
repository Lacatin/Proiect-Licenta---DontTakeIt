import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '~shared/model/student-model';
import { RestService } from '~shared/services/rest-service';

@Component({
  selector: 'app-studenti-page',
  templateUrl: './studenti-page.component.html',
  styleUrls: ['./studenti-page.component.scss']
})
export class StudentiPageComponent implements OnInit {

  student: Student;
  studentId: string;
  url: string = "/studenti/";

  constructor(
    private restService: RestService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      paramMap => {
          this.studentId = paramMap.get('id')!;
      }
    )

    this.url += this.studentId;
    this.restService.get<Student>(this.url).subscribe(
      (data:Student) => {
        this.student = data;
        console.log(this.student);
      }
    )
  }

}
