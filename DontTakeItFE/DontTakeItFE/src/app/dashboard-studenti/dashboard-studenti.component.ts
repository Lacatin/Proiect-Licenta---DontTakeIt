import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-studenti',
  templateUrl: './dashboard-studenti.component.html',
  styleUrls: ['./dashboard-studenti.component.scss']
})
export class DashboardStudentiComponent implements OnInit {

  formGroup: FormControl = new FormControl;

  options: Observable<string[]> | undefined;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
