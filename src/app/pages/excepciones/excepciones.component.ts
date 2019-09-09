import { Component, OnInit } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { ExcepcionService } from 'src/app/services/excepcion.service';

@Component({
  selector: 'app-excepciones',
  templateUrl: './excepciones.component.html',
  styles: []
})
export class ExcepcionesComponent implements OnInit {
  public tableData1: TableData;
  public empleado = '';
  public fecha: String;
  constructor(public _excepcionService: ExcepcionService) { }

  ngOnInit() {

    this._excepcionService.getPersona().subscribe(data => {
      this.tableData1 = {
        headerRow: ['ID', 'Fecha', 'Apertura', 'Cierre', 'Local', 'ID Empleado', 'Nombre empleado'],
        dataRows: data['lista']
      };
      console.log(this.tableData1);
    });
  }

  /* mostrarDia(dia) {
    this.dia = this.definirDia(dia);
    this._excepcionService.getPersona(dia, this.empleado).subscribe(data => {
      this.tableData1.dataRows = data['lista'];
    });
  } */

  filtrarFecha() {
    const fecha = this.definirFecha(this.fecha);
    this._excepcionService.getPersona(fecha, this.empleado).subscribe(data => {
      this.tableData1.dataRows = data['lista'];
    });
  }

  buscarEmpleado() {
    console.log(this.empleado);
    if (this.empleado.length > 0) {
      this._excepcionService.getPersona(null, this.empleado).subscribe(data => {
        this.fecha = null;
        this.tableData1.dataRows = data['lista'];
        console.log(data['lista']);
      });
    } else {
      this._excepcionService.getPersona(null, null).subscribe(data => {
        this.fecha = null;
        this.tableData1.dataRows = data['lista'];
        console.log(data['lista']);
      });
    }
  }

  definirFecha(fecha): String {
    const fechaCadena = fecha.substring(0, 4) + fecha.substring(5, 7) + fecha.substring(8);
    console.log(fechaCadena);
    return fechaCadena;
  }
}
