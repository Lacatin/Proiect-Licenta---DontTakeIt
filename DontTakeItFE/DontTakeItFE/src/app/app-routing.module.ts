import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardStudentiComponent } from './dashboard-studenti/dashboard-studenti.component';

const routes: Routes = [

{
  path:'studenti',
  component: DashboardStudentiComponent,
  pathMatch: 'full'
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
