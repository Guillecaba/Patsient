import { Component, OnInit } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
import { DoctorService } from 'src/app/services/doctor.service';

declare const $: any;

@Component({
  selector: 'app-personapordia',
  templateUrl: './personapordia.component.html',
  styles: []
})
export class PersonaPorDiaComponent implements OnInit {
  public tableData1: TableData;
  public empleado = '';
  public dia: String;
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
  }

  getData() {
    this._doctorService.getPersona().subscribe(data => {
      this.tableData1 = {
        headerRow: ['ID', 'Dia', 'Apertura', 'Cierre', 'Local', 'ID Empleado', 'Nombre empleado', 'Acciones'],
        dataRows: data['lista']
      };
      // console.log(this.tableData1);
    });
  }

  mostrarDia(dia) {
    this.dia = this.definirDia(dia);
    this._doctorService.getPersona(dia, this.empleado).subscribe(data => {
      this.tableData1.dataRows = data['lista'];
    });
  }

  buscarEmpleado() {
    console.log(this.empleado);
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
