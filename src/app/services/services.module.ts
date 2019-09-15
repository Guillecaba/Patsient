import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from './paciente.service';
import { DoctorService } from './doctor.service';
import { ExcepcionService } from './excepcion.service';
import { CategoriaService } from './categoria.service';
import { ReservaService } from './reserva.service';
import { SubcategoriaService } from './subcategoria.service';
import { PresentacionService } from './presentacion.service';
import { ReportesService } from './reportes.service';
import { LoginService } from './login.service'

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CategoriaService,
    ReservaService,
    SubcategoriaService,
    PresentacionService,
    ReportesService,
    PacienteService,
    DoctorService,
    ExcepcionService,
    LoginService
  ]
})
export class ServicesModule { }
