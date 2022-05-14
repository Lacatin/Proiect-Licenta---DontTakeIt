import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';

const routes: Routes = [];

/**
 * Route configuration
 */
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
  useHash: false // remove the # in URL
  ,
  relativeLinkResolution: 'legacy'
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
