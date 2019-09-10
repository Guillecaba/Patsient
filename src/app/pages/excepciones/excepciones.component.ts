import { Component, OnInit } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { ExcepcionService } from 'src/app/services/excepcion.service';

declare const $: any;

@Component({
  selector: 'app-excepciones',
  templateUrl: './excepciones.component.html',
  styles: []
})
export class ExcepcionesComponent implements OnInit {
  public tableData1: TableData;
  public empleado = '';
  public fecha: String;
  private nueva_excepcion: any = {
    fechaCadena: null,
    horaAperturaCadena: null,
    horaCierreCadena: null,
    flagEsHabilitar: null,
    idEmpleado: {
      idPersona: null
    },
    intervaloMinutos: null,
  };
  private edit_excepcion: any = {
    idHorarioExcepcion: null,
    fechaCadena: null,
    horaAperturaCadena: null,
    horaCierreCadena: null,
    flagEsHabilitar: null,
    idEmpleado: {
      idPersona: null
    },
    intervaloMinutos: null,
  };
  private delete_excepcion: any = {
    idHorarioExcepcion: null,
    fechaCadena: null,
    horaAperturaCadena: null,
    horaCierreCadena: null,
    flagEsHabilitar: null,
    idEmpleado: {
      idPersona: null
    },
    intervaloMinutos: null,
  };
  constructor(public _excepcionService: ExcepcionService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._excepcionService.getPersona().subscribe(data => {
      this.tableData1 = {
        headerRow: ['ID', 'Fecha', 'Apertura', 'Cierre', 'Local', 'ID Empleado', 'Nombre empleado', '¿Disponible?', 'Acciones'],
        dataRows: data['lista']
      };
      // console.log(this.tableData1);
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

  closeAdd(send) {
    if (send) {
      this._excepcionService.post(this.nueva_excepcion).subscribe(() => {
        this.getData();
      });
    }
    this.nueva_excepcion = {
      fechaCadena: null,
      horaAperturaCadena: null,
      horaCierreCadena: null,
      flagEsHabilitar: null,
      idEmpleado: {
        idPersona: null
      },
      intervaloMinutos: null,
    };
    $('#addModal').modal('hide');
  }

  openEdit(to_edit) {
    this.edit_excepcion = JSON.parse(JSON.stringify(to_edit));
    $('#editModal').modal('show');
  }

  closeEdit(send) {
    if (send) {
      this._excepcionService.put(this.edit_excepcion).subscribe(() => {
        this.getData();
      });
    }
    this.edit_excepcion = {
      idHorarioExcepcion: null,
      fechaCadena: null,
      horaAperturaCadena: null,
      horaCierreCadena: null,
      flagEsHabilitar: null,
      idEmpleado: {
        idPersona: null
      },
      intervaloMinutos: null,
    };
    $('#editModal').modal('hide');
  }

  openDelete(to_delete) {
    this.delete_excepcion = JSON.parse(JSON.stringify(to_delete));
    $('#deleteModal').modal('show');
  }

  closeDelete(send) {
    if (send) {
      this._excepcionService.delete(this.delete_excepcion['idHorarioExcepcion']).subscribe(() => {
        this.getData();
      });
    }
    this.delete_excepcion = {
      idHorarioExcepcion: null,
      fechaCadena: null,
      horaAperturaCadena: null,
      horaCierreCadena: null,
      flagEsHabilitar: null,
      idEmpleado: {
        idPersona: null
      },
      intervaloMinutos: null,
    };
    $('#deleteModal').modal('hide');
  }
}
