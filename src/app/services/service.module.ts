import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from './paciente.service';
import { ReservaService } from './reserva.service';
import { FichaService } from './fichas.service';
import { DetallesService } from './detalles.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    PacienteService,
    ReservaService,
    FichaService,
    DetallesService
  ]
})
export class ServiceModule { }
