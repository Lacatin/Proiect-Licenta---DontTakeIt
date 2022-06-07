import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomePage} from "~pages/home/home.page";
import { StudentiDashboardComponent } from './studenti-dashboard/studenti-dashboard.component';
import { StudentiPageComponent } from './studenti-dashboard/studenti-page/studenti-page.component';
import { StudentiComparareComponent } from './studenti-comparare/studenti-comparare.component';

/**
 * All routes
 */
const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomePage},
    {path: 'studenti', component: StudentiDashboardComponent},
    {path: 'studenti/:id', component: StudentiPageComponent},
    {path: 'comparare', component: StudentiComparareComponent}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutes {
}
