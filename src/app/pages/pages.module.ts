import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { MaterialModule } from '../md/md.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { PagesRoutes } from './pages.routing';

import { MdModule } from '../md/md.module';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { FooterModule } from '../shared/footer/footer.module';
import { SidebarModule } from '../shared/sidebar/sidebar.module';
import { FixedpluginModule } from '../shared/fixedplugin/fixedplugin.module';
import { PacienteComponent } from './paciente/paciente.component';

import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from './paciente/i18nPaginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';

/* import { MAT_DATE_FORMATS } from '@angular/material';
  import { MomentDateAdapter } from '@angular/material-moment-adapter'; */

  export const MY_FORMATS = {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY',
    },
  };



@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterModule.forChild(PagesRoutes),
    FormsModule,
    SidebarModule,
        NavbarModule,
        FooterModule,
        FixedpluginModule,
    ReactiveFormsModule,
    MdModule
  ],
  declarations: [
    DashboardComponent,
    PagesComponent,
    PacienteComponent
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlCro,

     /*  {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}, */
    },
  ]
})

export class PagesModule {}
