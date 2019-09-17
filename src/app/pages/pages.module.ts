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
import { ReservaComponent } from './reserva/reserva.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { MatAutocompleteModule, MatTableModule } from '@angular/material';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { ReportesComponent } from './reportes/reportes.component';
import { LoginComponent } from './login/login.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { CrearReservaComponent } from './crear-reserva/crear-reserva.component';
import { ServicioComponent } from './servicio/servicio.component';
import { EditorServicioComponent } from './editor-servicio/editor-servicio.component';
import { FichaComponent } from './ficha/ficha.component';
import { DetallesServicioComponent } from './detalles-servicio/detalles-servicio.component';
import { MatListModule } from '@angular/material/list';

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
    MatAutocompleteModule,
    MatTableModule,
    MatDatepickerModule,
    MdModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatListModule
  ],
  declarations: [
    DashboardComponent,
    PagesComponent,
    SubcategoriaComponent,
    PresentacionComponent,
    ReportesComponent,
    PacienteComponent,
    PersonaPorDiaComponent,
    ExcepcionesComponent,
    CategoriaComponent,
    LoginComponent,
    ReservaComponent,
    CrearReservaComponent,
    ServicioComponent,
    EditorServicioComponent,
    FichaComponent,
    DetallesServicioComponent
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

export class PagesModule { }
