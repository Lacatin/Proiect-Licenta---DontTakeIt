import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {assign} from "lodash";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly _defaultConfig: MatSnackBarConfig;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly zone: NgZone
  ) {
    this._defaultConfig = {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top"
    }
  }

  default(message: string) {
    this.show(message, this._defaultConfig);
  }

  info(message: string) {
    const infoConfig = assign(this._defaultConfig, {
      panelClass: 'info-notification-overlay'
    });
    this.show(message, infoConfig);
  }

  success(message: string) {
    const successConfig = assign(this._defaultConfig, {
      panelClass: 'success-notification-overlay'
    });
    this.show(message, successConfig);
  }

  warn(message: string) {
    const warnConfig = assign(this._defaultConfig, {
      duration: 2500,
      panelClass: 'warn-notification-overlay'
    });
    this.show(message, warnConfig);
  }

  error(message: string) {
    const errorConfig = assign(this._defaultConfig, {
      duration: 3000,
      panelClass: 'error-notification-overlay'
    });
    this.show(message, errorConfig);
  }

  private show(message: string, configuration: MatSnackBarConfig) {
    // Need to open snackBar from Angular zone to prevent issues with its position per
    this.zone.run(() => this.snackBar.open(message, undefined, configuration));
  }
}
