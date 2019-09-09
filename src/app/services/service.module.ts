import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from './paciente.service';
import { DoctorService } from './doctor.service';
import { ExcepcionService } from './excepcion.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    PacienteService,
    DoctorService,
    ExcepcionService
  ]
})
export class ServiceModule { }
