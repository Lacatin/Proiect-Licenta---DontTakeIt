import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatDialogModule} from "@angular/material/dialog";
import {A11yModule} from "@angular/cdk/a11y";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {RouterModule} from "@angular/router";
import {FooterComponent} from "~shared/footer/footer.component";
import {LayoutComponent} from "~shared/layout/layout.component";
import {SidebarComponent} from "~shared/sidebar/sidebar.component";
import {HeaderModule} from "~shared/header/header.module";


/**
 * Shared components
 */
const COMPONENTS: any[] = [FooterComponent, LayoutComponent, SidebarComponent];

/**
 * Shared directives
 */
const DIRECTIVES: any[] = [];

/**
 * Shared pipes
 */
const PIPES: any[] = [];

/**
 * Angular Material modules
 */
const ANGULAR_MATERIAL_MODULES = [
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatAutocompleteModule
];

/**
 * All modules to include
 */
const ALWAYS_USED_MODULES = [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, RouterModule,
  A11yModule, HeaderModule, ...ANGULAR_MATERIAL_MODULES];

@NgModule({
    imports: [...ALWAYS_USED_MODULES],

    exports: [...ALWAYS_USED_MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],

    declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],

    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
    constructor() {
    }
}
