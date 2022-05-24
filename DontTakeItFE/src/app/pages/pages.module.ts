import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from "~shared/shared.module";
import { PagesRoutes } from "./pages.routing";
import { HomePage } from './home/home.page';
import { MatTableModule } from '@angular/material/table';
import { StudentiDashboardComponent } from './studenti-dashboard/studenti-dashboard.component';


const ANGULAR_MATERIAL: any[] = [
    MatTableModule,
];

const PAGES_AND_COMPONENTS_FOR_PAGES: any[] = [
  HomePage

];

const MODALS: any[] = [
];

const ENTRY_COMPONENT: any[] = [];

/**
 * Service provider
 */
const FUNCTIONAL_SERVICES: any[] = [];

@NgModule({
    declarations: [
        ...PAGES_AND_COMPONENTS_FOR_PAGES,
        ...MODALS,
        StudentiDashboardComponent,
    ],
    imports: [
        ...ANGULAR_MATERIAL,
        SharedModule,
        PagesRoutes,
    ],
    providers: [
        ...FUNCTIONAL_SERVICES
    ],
    entryComponents: [
        ...ENTRY_COMPONENT,
        ...MODALS
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PagesModule {
}
