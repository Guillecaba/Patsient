import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from './paciente.service';
import { DoctorService } from './doctor.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    PacienteService,
    DoctorService
  ]
})
export class ServiceModule { }
