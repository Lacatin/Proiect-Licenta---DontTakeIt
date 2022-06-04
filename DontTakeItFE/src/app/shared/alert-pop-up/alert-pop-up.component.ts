import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-pop-up',
  templateUrl: './alert-pop-up.component.html',
  styleUrls: ['./alert-pop-up.component.scss']
})
export class AlertPopUpComponent implements OnInit {
  status='';
  message = '';
  constructor() { }

  ngOnInit(): void {
  }

}

