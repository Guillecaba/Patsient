import { Component, OnInit } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styles: []
})
export class PacienteComponent implements OnInit {
  public tableData1: TableData;
  public nombre="";
  constructor(public _pacienteService: PacienteService) { }

  ngOnInit() {
    
   this._pacienteService.getPersona().subscribe(data =>{
    this.tableData1 = {
      headerRow: [ 'ID', 'Nombre',  'Apellido,', 'Teléfono', 'Email','RUC','CI','Tipo de persona','Fecha de nacimiento' ],
      dataRows : data['lista']
   };
   console.log( this.tableData1 )
   })
  }

  ordenadoPor(valor) {
    console.log(valor);
    this._pacienteService.getPersona(valor,null).subscribe(data => {
      this.tableData1.dataRows = data['lista']
      console.log(data['lista'])
    })
    
  
  }

  ordenDireccion(valor) {
    this._pacienteService.getPersona(null,valor).subscribe(data => {
      this.tableData1.dataRows = data['lista'];
      console.log(data['lista'])
    })
    console.log(valor);
  }

  buscarNombre() {
    console.log(this.nombre)
     if(this.nombre.length > 0) {
      console.log(this.nombre.length > 0)
    
      this._pacienteService.getPersona(null,null,this.nombre).subscribe(data => {
        this.tableData1.dataRows = data['lista'];
        console.log(data['lista'])
      })
     }else {
      console.log(this.nombre.length > 0)
     this._pacienteService.getPersona(null,null,null).subscribe(data => {
        this.tableData1.dataRows = data['lista'];
        console.log(data['lista'])
      })
     }
    
  }

}
