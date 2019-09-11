import { Component, OnInit } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { ExcepcionService } from 'src/app/services/excepcion.service';
import { PageEvent } from '@angular/material/paginator';

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
  public fechaCadena = null;
  public inicio = 0;
  public cantidad = 10;
  private orderBy = 'idHorarioExcepcion';
  private orderDir = 'asc';
  count: Number = 0;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
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
    this._excepcionService.getPersona(this.fechaCadena, this.empleado, this.inicio, this.cantidad, this.orderBy, this.orderDir)
      .subscribe(data => {
        this.tableData1 = {
          headerRow: ['ID', 'Fecha', 'Apertura', 'Cierre', 'Local', 'ID Empleado', 'Nombre empleado', '¿Disponible?', 'Acciones'],
          dataRows: data['lista']
        };
        this.count = data['totalDatos'];
      });
  }

  get_page(event) {
    this.cantidad = event.pageSize;
    this.inicio = event.pageSize * event.pageIndex;
    this.getData();
  }

  ordernar(orderBy) {
    const ordernarPor = this.orderBy;
    console.log(orderBy);
    if (orderBy === ' ID') {
      this.orderBy = 'idPersonaHorarioAgenda';
    }
    if (orderBy === ' Fecha') {
      this.orderBy = 'fecha';
    }
    if (orderBy === ' Apertura') {
      this.orderBy = 'horaApertura';
    }
    if (orderBy === ' Cierre') {
      this.orderBy = 'horaCierre';
    }
    if (orderBy === ' ID Empleado') {
      this.orderBy = 'idEmpleado';
    }
    if (orderBy === ' ¿Disponible?') {
      this.orderBy = 'flagEsHabilitar';
    }
    if (orderBy === ' Nombre empleado' || orderBy === ' Local' || orderBy === ' Acciones') {
      return;
    }
    if (this.orderBy !== ordernarPor || this.orderDir === 'null') {
      this.orderDir = 'asc';
    } else if (this.orderDir === 'asc') {
      this.orderDir = 'desc';
    } else if (this.orderDir === 'desc') {
      this.orderDir = 'asc';
    }
    this.getData();
  }

  buscarEmpleado() {
    if (this.empleado.length === 0) {
      this.empleado = null;
    }
    this.getData();
  }

  filtrarFecha() {
    const fecha = this.definirFecha(this.fecha);
    this.fechaCadena = fecha;
    /* this._excepcionService.getPersona(fecha, this.empleado).subscribe(data => {
      this.tableData1.dataRows = data['lista'];
    }); */
    this.getData();
  }

  /* buscarEmpleado() {
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
  } */

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
