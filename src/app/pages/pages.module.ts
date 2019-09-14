import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MaterialModule } from '../md/md.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { PagesRoutes } from './pages.routing';

// import { MaterialModule } from '../app.module';

import { MdModule } from '../md/md.module';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { FooterModule } from '../shared/footer/footer.module';
import { SidebarModule } from '../shared/sidebar/sidebar.module';
import { FixedpluginModule } from '../shared/fixedplugin/fixedplugin.module';
import { PacienteComponent } from './paciente/paciente.component';
import { PersonaPorDiaComponent } from './personapordia/personapordia.component';
import { ExcepcionesComponent } from './excepciones/excepciones.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from './categoria/i18nPaginator';
import { LoginComponent } from './login/login.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule,
    RouterModule.forChild(PagesRoutes),
    FormsModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedpluginModule,
    ReactiveFormsModule,
    MdModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  declarations: [
    DashboardComponent,
    PagesComponent,
    PacienteComponent,
    PersonaPorDiaComponent,
    ExcepcionesComponent,
    CategoriaComponent,
    LoginComponent
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlCro
    },
  ]
})

export class PagesModule { }
