import { Component, OnInit } from '@angular/core';
import {LayoutService} from "~core/layout-service/layout.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  constructor(private _layoutService: LayoutService) { }

  ngOnInit(): void {
    this._layoutService.setLayoutLogged();
  }

}
