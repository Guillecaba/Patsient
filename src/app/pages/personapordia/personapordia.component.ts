import { Component, OnInit } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
import { DoctorService } from 'src/app/services/doctor.service';
import { PageEvent } from '@angular/material/paginator';

declare const $: any;

@Component({
  selector: 'app-personapordia',
  templateUrl: './personapordia.component.html',
  styles: []
})
export class PersonaPorDiaComponent implements OnInit {
  public tableData1: TableData = null;
  public empleados: TableData = null;
  public empleado = '';
  public dia = null;
  public diaCadena: String;
  public inicio = 0;
  public cantidad = 10;
  private orderBy = 'idPersonaHorarioAgenda';
  private orderDir = 'asc';
  count: Number = 0;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent = null;
  private nuevo_horario: any = {
    dia: null,
    horaAperturaCadena: null,
    horaCierreCadena: null,
    intervaloMinutos: null,
    idEmpleado: {
      idPersona: null
    }
  };
  private edit_horario: any = {
    idPersonaHorarioAgenda: null,
    dia: null,
    horaAperturaCadena: null,
    horaCierreCadena: null,
    intervaloMinutos: null,
    idEmpleado: {
      idPersona: null
    }
  };
  private delete_horario: any = {
    idPersonaHorarioAgenda: null,
    dia: null,
    horaAperturaCadena: null,
    horaCierreCadena: null,
    intervaloMinutos: null,
    idEmpleado: {
      idPersona: null
    }
  };
  constructor(public _doctorService: DoctorService) { }

  ngOnInit() {
    this.getData();
    this._doctorService.getEmpleados().subscribe(data => {
      this.empleados = data['lista'];
    });
  }

  getData() {
    this._doctorService.getPersona(this.dia, this.empleado, this.inicio, this.cantidad, this.orderBy, this.orderDir).subscribe(data => {
      this.tableData1 = {
        headerRow: ['ID', 'Día', 'Apertura', 'Cierre', 'Local', 'ID Empleado', 'Nombre empleado', 'Acciones'],
        dataRows: data['lista']
      };
      this.count = data['totalDatos'];
    });
  }

  mostrarDia(dia) {
    this.diaCadena = this.definirDia(dia);
    /* this._doctorService.getPersona(dia, this.empleado).subscribe(data => {
      this.tableData1.dataRows = data['lista'];
    }); */
    this.getData();
  }

  get_page(event) {
    this.cantidad = event.pageSize;
    this.inicio = event.pageSize * event.pageIndex;
    this.getData();
  }

  ordernar(orderBy) {
    const ordernarPor = this.orderBy;
    if (orderBy === ' ID ') {
      this.orderBy = 'idPersonaHorarioAgenda';
    }
    if (orderBy === ' Día ') {
      this.orderBy = 'dia';
    }
    if (orderBy === ' Apertura ') {
      this.orderBy = 'horaApertura';
    }
    if (orderBy === ' Cierre ') {
      this.orderBy = 'horaCierre';
    }
    if (orderBy === ' ID Empleado ') {
      this.orderBy = 'idEmpleado';
    }
    if (orderBy === ' Nombre empleado ' || orderBy === ' Local ' || orderBy === ' Acciones ') {
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

  definirDia(idDia): String {
    this.dia = idDia;
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
      this.dia = null;
      return '';
    }
  }

  closeAdd(send) {
    if (send) {
      this._doctorService.post(this.nuevo_horario).subscribe(() => {
        this.getData();
      });
    }
    this.nuevo_horario = {
      dia: null,
      horaAperturaCadena: null,
      horaCierreCadena: null,
      intervaloMinutos: null,
      idEmpleado: {
        idPersona: null
      }
    };
    $('#addModal').modal('hide');
  }

  openEdit(to_edit) {
    this.edit_horario = JSON.parse(JSON.stringify(to_edit));
    $('#editModal').modal('show');
  }

  closeEdit(send) {
    if (send) {
      let horas = this.edit_horario.horaAperturaCadena.toString().substring(0, 2);
      let minutos = this.edit_horario.horaAperturaCadena.toString().substring(3, 5);
      this.edit_horario.horaAperturaCadena = horas + minutos;
      horas = this.edit_horario.horaCierreCadena.toString().substring(0, 2);
      minutos = this.edit_horario.horaCierreCadena.toString().substring(3, 5);
      this.edit_horario.horaCierreCadena = horas + minutos;
      this.edit_horario.horaApertura = null;
      this.edit_horario.horaCierre = null;
      this.edit_horario.idLocal = null;
      const idP = this.edit_horario.idEmpleado.idPersona;
      this.edit_horario.idEmpleado = {
        idPersona: idP,
      }
      this._doctorService.put(this.edit_horario).subscribe(() => {
        this.getData();
      });
    }
    this.edit_horario = {
      idPersonaHorarioAgenda: null,
      dia: null,
      horaAperturaCadena: null,
      horaCierreCadena: null,
      intervaloMinutos: null,
      idEmpleado: {
        idPersona: null
      }
    };
    $('#editModal').modal('hide');
  }

  openDelete(to_delete) {
    this.delete_horario = JSON.parse(JSON.stringify(to_delete));
    $('#deleteModal').modal('show');
  }

  closeDelete(send) {
    if (send) {
      this._doctorService.delete(this.delete_horario['idPersonaHorarioAgenda']).subscribe(() => {
        this.getData();
      });
    }
    this.delete_horario = {
      idPersonaHorarioAgenda: null,
      dia: null,
      horaAperturaCadena: null,
      horaCierreCadena: null,
      intervaloMinutos: null,
      idEmpleado: {
        idPersona: null
      }
    };
    $('#deleteModal').modal('hide');
  }
}
