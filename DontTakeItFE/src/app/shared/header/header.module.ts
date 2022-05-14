import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import {HeaderComponent} from './containers';
import {ShortNamePipe} from './pipes';
import {DarkModeComponent} from './components/dark-mode/dark-mode.component';
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    HeaderComponent,
    ShortNamePipe,
    DarkModeComponent,
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FlexLayoutModule
  ]
})
export class HeaderModule { }
