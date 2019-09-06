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
  public nombre = '';
  constructor(public _doctorService: DoctorService) { }

  ngOnInit() {

    this._doctorService.getPersona().subscribe(data => {
      this.tableData1 = {
        headerRow: ['ID', 'Dia', 'Apertura', 'Cierre', 'Local', 'Empleado'],
        dataRows: data['lista']
      };
      console.log(this.tableData1)
    })
  }

  mostrarDia(dia) {
    console.log(dia);
    this._doctorService.getPersona(dia, null).subscribe(data => {
      this.tableData1.dataRows = data['lista'];
      console.log(data['lista']);
    });
  }

  /* ordenDireccion(valor) {
    this._pacienteService.getPersona(null, valor).subscribe(data => {
      this.tableData1.dataRows = data['lista'];
      console.log(data['lista'])
    })
    console.log(valor);
  }

  buscarNombre() {
    console.log(this.nombre)
    if (this.nombre.length > 0) {
      console.log(this.nombre.length > 0)

      this._pacienteService.getPersona(null, null, this.nombre).subscribe(data => {
        this.tableData1.dataRows = data['lista'];
        console.log(data['lista'])
      })
    } else {
      console.log(this.nombre.length > 0)
      this._pacienteService.getPersona(null, null, null).subscribe(data => {
        this.tableData1.dataRows = data['lista'];
        console.log(data['lista'])
      })
    } 

  }*/

}
