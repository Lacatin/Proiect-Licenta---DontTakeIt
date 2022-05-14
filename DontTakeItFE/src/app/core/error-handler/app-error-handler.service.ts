import {Injectable, ErrorHandler} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {environment} from '../../../environments/environment';

import {NotificationService} from '../notifications/notification.service';
import {isMatch, merge} from "lodash"


/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private notificationsService: NotificationService) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // maybe treat only some statuses or treat statuses differently
      this.notificationsService.error(error.message);
    } else {
      this.notificationsService.error(error.message);
    }

    super.handleError(error);
  }
}
