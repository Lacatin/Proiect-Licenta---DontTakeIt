import {Component, OnInit} from '@angular/core';
import {NotificationService} from "~core/notifications/notification.service";
import {ThemeService} from "~core/theme-service/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  className = "theme-wrapper background";
  darkMode = false;
  constructor(private _notificationService: NotificationService, private _themeService: ThemeService) {
    this._themeService.setDarkMode(this.darkMode);
  }

  ngOnInit(): void {
    this._themeService.subscribeDarkMode(isDark => {
      this.className = isDark ? this.className + " dark-theme" : "theme-wrapper background";
    });
  }

  click() {
    this.darkMode = !this.darkMode;
    this._themeService.setDarkMode(this.darkMode);
    this._notificationService.success("test");
  }
}
