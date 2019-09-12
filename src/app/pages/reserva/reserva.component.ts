import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})

export class ReservaComponent implements OnInit {

  // inputs
  fecha1;
  fecha2;

  reservas: any;
  pacientes: any;
  empleados: any;
  fecha_inicio: string;
  fecha_fin: string;
  actualCliente: number;
  actualClienteNombre: string;
  actualEmpleado: number;
  actualEmpleadoNombre: string;
  constructor(public reservaService: ReservaService, public pacienteService: PacienteService, public datePipe: DatePipe) { }

  ngOnInit() {
    let hoy: string;
    this.pacienteService.getTodos().subscribe((res: any) => (
      this.pacientes = res['lista']
    ));
    this.pacienteService.getTodosEmpleados().subscribe((res: any) => (
      this.empleados = res['lista']
    ));
    hoy = new Date().toJSON('yyyy/MM/dd').substr(0, 10);
    hoy = hoy.substr(0, 4) + hoy.substr(5, 2) + hoy.substr(8, 2);
    console.log(hoy);
    // carga todas las reservas de hoy
    this.reservaService.getReservas(hoy, hoy, null, null).subscribe((res: any) => (
      this.reservas = res['lista']
    ));
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
  setFechaInicio(event: any) {
    this.fecha_inicio = event.target.value;
    this.fecha_inicio = this.datePipe.transform(this.fecha_inicio, 'yyyyMMdd');
    console.log('Fecha ini:' + this.fecha_inicio + '\nFecha fin:' + this.fecha_fin);
  }
  setFechaFin(event: any) {
    this.fecha_fin = event.target.value;
    this.fecha_fin = this.datePipe.transform(this.fecha_fin, 'yyyyMMdd');
    console.log('Fecha ini:' + this.fecha_inicio + '\nFecha fin:' + this.fecha_fin);
  }
  limpiarFiltros() {
    this.fecha_inicio = null;
    this.fecha_fin = null;
    this.actualEmpleado = null;
    this.actualEmpleadoNombre = null;
    this.actualCliente = null;
    this.actualClienteNombre = null;
    this.fecha1 = null;
    this.fecha2 = null;
  }
  buscar() {
    this.reservaService.getReservas(this.fecha_inicio, this.fecha_fin, this.actualCliente, this.actualEmpleado).subscribe((res: any) => (
      this.reservas = res['lista']
    ));
  }
}
