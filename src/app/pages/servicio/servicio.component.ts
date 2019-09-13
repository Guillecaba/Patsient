import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  // inputs
  fecha1;
  fecha2;

  idServicio: number;
  servicios: any;
  pacientes: any;
  empleados: any;
  fecha_inicio: string;
  fecha_fin: string;
  actualCliente: number;
  actualClienteNombre: string;
  actualEmpleado: number;
  actualEmpleadoNombre: string;

  constructor(public reservaService: ReservaService,
    public pacienteService: PacienteService,
    public categoriaService: CategoriaService,
    public subcategoriaService: SubcategoriaService,
    public datePipe: DatePipe,
    private router: Router) { }

  ngOnInit() {
  }

}
