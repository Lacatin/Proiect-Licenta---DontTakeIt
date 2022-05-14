import { Component, OnInit } from '@angular/core';
import { Student } from '~shared/model/student-model';
import { RestService } from '~shared/services/rest-service';

@Component({
  selector: 'app-studenti-dashboard',
  templateUrl: './studenti-dashboard.component.html',
  styleUrls: ['./studenti-dashboard.component.scss']
})
export class StudentiDashboardComponent implements OnInit {

studenti: Student[];

  constructor(private restService: RestService) { }

  ngOnInit(): void {
    
    this.restService.get<Student[]>('/studenti').subscribe((data: Student[]) => {
      this.studenti = data;
      console.log(data);
    });
    
    console.log(this.studenti);
  }

}
