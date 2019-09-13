import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-editor-servicio',
  templateUrl: './editor-servicio.component.html',
  styleUrls: ['./editor-servicio.component.css']
})
export class EditorServicioComponent implements OnInit {

  nuevo: boolean;
  tituloPagina: string;
  idServicio: number;

  // inputs
  fecha1;
  observacion: string;
  actualFicha;

  fichas: any;
  pacientes: any;
  empleados: any;
  fecha: string;
  actualCliente: number;
  actualClienteNombre: string;
  actualEmpleado: number;
  actualEmpleadoNombre: string;

  constructor(public pacienteService: PacienteService, public datePipe: DatePipe, private route: ActivatedRoute) { }
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tituloPagina = 'Editar Servicio';
      this.nuevo = false;
      this.idServicio = id;
    } else {
      this.tituloPagina = 'Crear Servicio';
      this.nuevo = true;
      this.idServicio = null;
      this.pacienteService.getTodos().subscribe((res: any) => (
        this.pacientes = res['lista']
      ));
      this.pacienteService.getTodosEmpleados().subscribe((res: any) => (
        this.empleados = res['lista']
      ));
    }
  }

  setCliente(cliente: any) {
    this.actualCliente = cliente['idPersona'];
    this.actualClienteNombre = cliente['nombre'];
    console.log('Cliente: ' + this.actualCliente + '\nEmpleado: ' + this.actualEmpleado);
  }

  setEmpleado(empleado: any) {
    this.actualEmpleado = empleado['idPersona'];
    this.actualEmpleadoNombre = empleado['nombre'];
    console.log('Cliente: ' + this.actualCliente + '\nEmpleado: ' + this.actualEmpleado);
  }

  setFecha(event: any) {
    this.fecha = event.target.value;
    this.fecha = this.datePipe.transform(this.fecha, 'yyyyMMdd');
  }

}
