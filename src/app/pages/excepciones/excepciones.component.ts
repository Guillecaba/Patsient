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
  public tableData1: TableData = null;
  public empleados: TableData = null;
  public empleado = '';
  public fecha: Date = null;
  public fechaCadena = null;
  public inicio = 0;
  public cantidad = 10;
  private orderBy = 'idHorarioExcepcion';
  private orderDir = 'asc';
  count: Number = 0;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent = null;
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
    this._excepcionService.getEmpleados().subscribe(data => {
      this.empleados = data['lista'];
    });
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
    if (orderBy === ' ID') {
      this.orderBy = 'idHorarioExcepcion';
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

  filtrar() {
    if (this.empleado !== null && this.empleado.length === 0) {
      this.empleado = null;
    }
    if (this.fecha === null) {
      this.fechaCadena = null;
    } else {
      const fecha = this.definirFecha(this.fecha);
      this.fechaCadena = fecha;
    }
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
    const anho = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const anhoCadena = anho.toString();
    let mesCadena: String;
    let diaCadena: String;
    if (mes < 10) {
      mesCadena = '0' + mes.toString();
    } else {
      mesCadena = mes.toString();
    }
    if (dia < 10) {
      diaCadena = '0' + dia.toString();
    } else {
      diaCadena = dia.toString();
    }
    const fechaCadena = anhoCadena + mesCadena + diaCadena;
    return fechaCadena;
  }

  closeAdd(send) {
    if (send) {
      this.nueva_excepcion.fechaCadena = this.definirFecha(this.nueva_excepcion.fechaCadena);
      if (this.nueva_excepcion.flagEsHabilitar === 'S' &&
        this.nueva_excepcion.horaAperturaCadena !== null &&
        this.nueva_excepcion.horaCierreCadena !== null) {
        let horas = this.nueva_excepcion.horaAperturaCadena.toString().substring(0, 2);
        let minutos = this.nueva_excepcion.horaAperturaCadena.toString().substring(3, 5);
        this.nueva_excepcion.horaAperturaCadena = horas + minutos;
        horas = this.nueva_excepcion.horaCierreCadena.toString().substring(0, 2);
        minutos = this.nueva_excepcion.horaCierreCadena.toString().substring(3, 5);
        this.nueva_excepcion.horaCierreCadena = horas + minutos;
      }
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
      this.edit_excepcion.fechaCadena = this.definirFecha(this.edit_excepcion.fechaCadena);
      if (this.edit_excepcion.flagEsHabilitar === 'S' &&
        this.edit_excepcion.horaAperturaCadena !== null &&
        this.edit_excepcion.horaCierreCadena !== null) {
        let horas = this.edit_excepcion.horaAperturaCadena.toString().substring(0, 2);
        let minutos = this.edit_excepcion.horaAperturaCadena.toString().substring(3, 5);
        this.edit_excepcion.horaAperturaCadena = horas + minutos;
        horas = this.edit_excepcion.horaCierreCadena.toString().substring(0, 2);
        minutos = this.edit_excepcion.horaCierreCadena.toString().substring(3, 5);
        this.edit_excepcion.horaCierreCadena = horas + minutos;
      }
      this.edit_excepcion.horaApertura = null;
      this.edit_excepcion.horaCierre = null;
      this.edit_excepcion.fecha = null;
      this.edit_excepcion.idLocal = null;
      const idP = this.edit_excepcion.idEmpleado.idPersona;
      this.edit_excepcion.idEmpleado = {
        idPersona: idP,
      }
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
