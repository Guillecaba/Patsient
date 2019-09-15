import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { FichaService } from '../../services/fichas.service'
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styles: []
})
export class FichaComponent implements OnInit {
  pacientes: any;
  empleados: any;

  // inputs
  fecha1;
  fecha2;

  fecha_inicio: string;
  fecha_fin: string;

  actualCliente: number;
  actualClienteNombre: string;
  actualEmpleado: number;
  actualEmpleadoNombre: string;

  fichas;


  constructor(public _pacienteService: PacienteService, public _fichasService: FichaService, public datePipe: DatePipe) { }

  ngOnInit() {

    this._pacienteService.getTodos().subscribe((res: any) => (
      this.pacientes = res['lista']
    ));
    this._pacienteService.getTodosEmpleados().subscribe((res: any) => (
      this.empleados = res['lista']
    ));
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

  /*buscar() {
    this._fichasService.get({
      ejemplo:encodeURIComponent(JSON.stringify({
        fechaDesdeCadena: this.fecha_inicio,
        fechaHastaCadena:this.fecha_fin,
        idEmpleado:encodeURIComponent(JSON.stringify({idPersona: this.actualEmpleado}))
    }
      
      
      this.fecha_inicio, this.fecha_fin, this.actualCliente, this.actualEmpleado).subscribe((res: any) => (
      this.fichas = res['lista']
    ));

}*/
}
