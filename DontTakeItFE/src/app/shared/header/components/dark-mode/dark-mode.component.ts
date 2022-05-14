import { Component, OnInit } from '@angular/core';
import {ThemeService} from "~core/theme-service/theme.service";

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.scss']
})
export class DarkModeComponent implements OnInit {

  constructor(private _themeService: ThemeService) { }

  ngOnInit(): void {
  }

  changeTheme(event: any) {
    this._themeService.setDarkMode(event.target.checked);
  }

}
