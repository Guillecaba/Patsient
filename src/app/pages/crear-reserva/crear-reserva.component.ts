import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { DatePipe } from '@angular/common';
import { AgendaService } from 'src/app/services/agenda.service';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {
  // input
  fecha1;
  elegido: any;

  pacientes: any;
  empleados: any;
  agendas: any;
  fecha: string;
  cli: number;
  cliNombre: string;
  empl: number;
  emplNombre: string;

  soloDisponibles = false;
  sePuedeBuscar = false;

  // Para el modal buscar empleado
  empNombre: String = null;
  empApellido: String = null;
  empSeleccionado = null;
  empCantidad: Number = 0;

  // Para el modal buscar paciente
  pacNombre: String = null;
  pacApellido: String = null;
  pacSeleccionado = null;
  pacCantidad: Number = 0;

  constructor(public reservaService: ReservaService,
    public pacienteService: PacienteService,
    public datePipe: DatePipe,
    public agendaService: AgendaService,
    private router: Router
  ) { }

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
  }

  setCliente(cliente: any) {
    this.cli = cliente['idPersona'];
    this.cliNombre = cliente['nombre'];
  }
  setEmpleado(empleado: any) {
    this.empl = empleado['idPersona'];
    this.emplNombre = empleado['nombre'];
    this.validarBusqueda();
  }
  setFecha(event: any) {
    this.fecha = event.target.value;
    this.fecha = this.datePipe.transform(this.fecha, 'yyyyMMdd');
    console.log('Fecha:' + this.fecha);
    this.validarBusqueda();
  }
  buscarAgenda() {
    this.elegido = null;
    this.agendaService.getReservas(this.empl, this.fecha, this.soloDisponibles).subscribe((res: any) => (
      this.agendas = res
    ));
  }
  validarBusqueda() {
    if (this.fecha && this.empl) {
      this.sePuedeBuscar = true;
    } else {
      this.sePuedeBuscar = false;
    }
  }
  crearReserva() {
    let datos = '{"fechaCadena": "';
    datos = datos + this.fecha + '","horaInicioCadena":"';

    // extrae la hora en forma de cadena sin importar si usa datetime o time
    let horaInicio = this.elegido.horaInicio;
    if (horaInicio.length === 19) {
      horaInicio = horaInicio.substr(11, 2) + horaInicio.substr(14, 2);
    } else if (horaInicio.length === 8) {
      horaInicio = horaInicio.substr(0, 2) + horaInicio.substr(3, 2);
    } else {
      console.log('Error en el formato de fecha de la entrada (fecha inicial)');
    }
    console.log(horaInicio);

    // extrae la hora en forma de cadena sin importar si usa datetime o time
    let horaFin = this.elegido.horaFin;
    if (horaFin.length === 19) {
      horaFin = horaFin.substr(11, 2) + horaFin.substr(14, 2);
    } else if (horaFin.length === 8) {
      horaFin = horaFin.substr(0, 2) + horaFin.substr(3, 2);
    } else {
      console.log('Error en el formato de fecha de la entrada (fecha final)');
    }
    console.log(horaFin);
    datos = datos + horaInicio + '","horaFinCadena":"' + horaFin + '",';
    datos = datos + '"idEmpleado":{"idPersona":' + this.empl + '},"idCliente":{"idPersona":';
    datos = datos + this.cli + '}}';
    this.reservaService.postReserva(datos).subscribe(res => {
      if (res) {
        console.log('Reservación creada con éxito!');
        this.router.navigateByUrl('/reservas');
      }
    });
  }

  openEmpleado() {
    this.empNombre = null;
    this.empApellido = null;
    this.empSeleccionado = null;
    this.pacienteService.filtrarEmpleados().subscribe((res: any) => {
      this.empleados = res['lista'];
      this.empCantidad = res['totalDatos'];
      $('#empleadoModal').modal('show');
    });
  }

  buscarEmpleado() {
    this.pacienteService.filtrarEmpleados(this.empNombre, this.empApellido).subscribe((res: any) => {
      this.empleados = res['lista'];
      this.empCantidad = res['totalDatos'];
    });
  }

  selectEmpleado(empleado) {
    this.empSeleccionado = empleado['idPersona'];
    this.emplNombre = empleado['nombre'];
    this.empl = this.empSeleccionado;
    $('#empleadoModal').modal('hide');
  }

  closeEmpleado() {
    this.empNombre = null;
    this.empApellido = null;
    this.empSeleccionado = null;
    $('#empleadoModal').modal('hide');
  }

  openPaciente() {
    this.pacNombre = null;
    this.pacApellido = null;
    this.pacSeleccionado = null;
    this.pacienteService.filtrarPacientes().subscribe((res: any) => {
      this.pacientes = res['lista'];
      this.pacCantidad = res['totalDatos'];
      $('#pacienteModal').modal('show');
    });
  }

  buscarPaciente() {
    this.pacienteService.filtrarPacientes(this.pacNombre, this.pacApellido).subscribe((res: any) => {
      this.pacientes = res['lista'];
      this.pacCantidad = res['totalDatos'];
    });
  }

  selectPaciente(paciente) {
    this.pacSeleccionado = paciente['idPersona'];
    this.cliNombre = paciente['nombre'];
    this.cli = this.pacSeleccionado;
    this.pacSeleccionado = null;
    $('#pacienteModal').modal('hide');
  }

  closePaciente() {
    this.pacNombre = null;
    this.pacApellido = null;
    this.pacSeleccionado = null;
    $('#pacienteModal').modal('hide');
  }
}
