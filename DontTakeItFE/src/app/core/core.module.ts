import {ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {NotificationService} from './notifications/notification.service';
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import {SharedModule} from "~shared/shared.module";
import {ThemeService} from "~core/theme-service/theme.service";
import {HttpErrorInterceptor} from "~core/http-interceptors/http-error.interceptor";
import {AppErrorHandler} from "~core/error-handler/app-error-handler.service";
import {LayoutService} from "~core/layout-service/layout.service";

export {
    NotificationService,
};

/**
 * Core providers
 */
export const APP_CORE_PROVIDERS = [

    // ------------------ PLATFORM RELATED ------------------
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    // ------------------  HELPERS ------------------
    ThemeService,
    LayoutService,
    // ------------------  APP SERVICES ------------------
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: ErrorHandler, useClass: AppErrorHandler},

];

@NgModule({
    imports: [
        // angular
        HttpClientModule,
        SharedModule,
    ],
    declarations: [],
    providers: [],
    exports: [

    ]
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
            parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import only in AppModule');
        }
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [...APP_CORE_PROVIDERS]
        };
    }
}
