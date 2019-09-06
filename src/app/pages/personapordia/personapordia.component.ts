import { Component, OnInit } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-personapordia',
  templateUrl: './personapordia.component.html',
  styles: []
})
export class PersonaPorDiaComponent implements OnInit {
  public tableData1: TableData;
  public empleado = '';
  public dia: String;
  constructor(public _doctorService: DoctorService) { }

  ngOnInit() {

    this._doctorService.getPersona().subscribe(data => {
      this.tableData1 = {
        headerRow: ['ID', 'Dia', 'Apertura', 'Cierre', 'Local', 'ID Empleado', 'Nombre empleado'],
        dataRows: data['lista']
      };
      console.log(this.tableData1)
    });
  }

  mostrarDia(dia) {
    this.dia = this.definirDia(dia);
    this._doctorService.getPersona(dia, this.empleado).subscribe(data => {
      this.tableData1.dataRows = data['lista'];
    });
  }

  buscarEmpleado() {
    console.log(this.empleado)
    if (this.empleado.length > 0) {
      this._doctorService.getPersona(null, this.empleado).subscribe(data => {
        this.dia = null;
        this.tableData1.dataRows = data['lista'];
        console.log(data['lista']);
      });
    } else {
      this._doctorService.getPersona(null, null).subscribe(data => {
        this.dia = null;
        this.tableData1.dataRows = data['lista'];
        console.log(data['lista']);
      });
    }
  }

  definirDia(idDia): String {
    if (idDia === 0) {
      return 'Domingo';
    } else if (idDia === 1) {
      return 'Lunes';
    } else if (idDia === 2) {
      return 'Martes';
    } else if (idDia === 3) {
      return 'Miércoles';
    } else if (idDia === 4) {
      return 'Jueves';
    } else if (idDia === 5) {
      return 'Viernes';
    } else if (idDia === 6) {
      return 'Sábado';
    } else {
      return '';
    }
  }
}
