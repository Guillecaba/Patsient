import { Component, OnInit } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
import { PacienteService } from 'src/app/services/paciente.service';
import { PageEvent } from '@angular/material/paginator'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormGroup, Validators, FormControl } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styles: []
})
export class PacienteComponent implements OnInit {
  /* public tableData1: TableData;
  public nombre=""; */

  private data : any[] = [];
  private count : Number = 0;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];


  private pagination = {
    inicio: 0,
    cantidad: 10,
  }
  private orderBy = null;
  private orderDir = null;
  private nombre = null;
  private busquedaExacta=true;
  private usuarioSistema =null;
  private like="S";
  private columns = [
    {
      label:'Id',
      value:'idPersona',
      //width:'10%'
    },
    {
      label:'Nombre',
      value:'nombre',
      //width:'45%',
    },
    {
      label:'Apellido',
      value:'apellido',
    },
    {
      label:'Telefono',
      value:'telefono',
    },
    {
      label:'Email',
      value:'email',
    },
    {
      label:'RUC',
      value:'ruc',
    },
    {
      label:'Cedula',
      value:'cedula',
    },
    {
      label:'Tipo de persona',
      value:'tipoPersona',
    },
    {
      label:'Fecha de nacimiento',
      value:'fechaNacimiento',
    },
  ]
  private nueva_paciente: String = null;
  private edit_paciente: any = {
    descripcion : null
  };
  private delete_paciente : any ={
    descripcion : null
  };

  private forma = null;

  constructor(public _pacienteService: PacienteService) { }

  ngOnInit() {
    this.forma =  new FormGroup({
      'nombre': new FormControl('',[Validators.required]),
      'apellido': new FormControl('',[Validators.required]),
      'email': new FormControl(
        '',
        [ Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")]),
      'telefono': new FormControl(''),
      'ruc': new FormControl(''),
      'cedula': new FormControl(''),
      'tipoPersona':new FormControl('FISICA'),
      'fechaNacimiento':new FormControl(''),
    })
    
    this.getData();
  }

  getData(){
    console.log(this.usuarioSistema)
    if(this.usuarioSistema){
      this._pacienteService.get({
        
        ...this.pagination,
        orderBy:this.orderBy,
        orderDir:this.orderDir,
        ejemplo:encodeURIComponent(JSON.stringify({
          soloUsuariosDelSistema:this.usuarioSistema
        }))
      })
      .subscribe((response)=>{
        this.data = response['lista']
        this.count = response['totalDatos']
      })
    } else{
      this._pacienteService.get({
        ...this.pagination,
        orderBy:this.orderBy,
        orderDir:this.orderDir,
      })
      .subscribe((response)=>{
        this.data = response['lista']
        this.count = response['totalDatos']
      })
    }
    
  }


  get_page(event){
    this.pagination.cantidad = event.pageSize
    this.pagination.inicio = event.pageSize * event.pageIndex
    this.getData()
  }

  sortBy(orderBy){
    if(this.orderBy != orderBy || this.orderDir == 'null'){
      this.orderBy = orderBy;
      this.orderDir = 'asc';
    }else if(this.orderDir == 'asc'){
      this.orderDir = 'desc'
    }else if(this.orderDir == 'desc'){
      this.orderBy = null
      this.orderDir = null
    }

    this.getData()
  }

  searchByName () {
    /* /stock-pwfe/persona?ejemplo={"soloUsuariosDelSistema":true} */  
    if(this.busquedaExacta) {
      this._pacienteService.get({ejemplo:encodeURIComponent(JSON.stringify({
        nombre:this.nombre
      }))})
      .subscribe((response)=>{
        this.data = response['lista']
        this.count = response['totalDatos']
      })
    } else {
      this._pacienteService.get({like:this.like,ejemplo:encodeURIComponent(JSON.stringify({
        nombre: this.nombre
      }))})
      .subscribe((response)=> {
        this.data = response['lista']
        this.count = response['totalDatos']
      })
    } 

  }


  closeAdd(send){
    if(send){
      this._pacienteService.post({
        'descripcion' : this.nueva_paciente
      }).subscribe(()=>{
        this.getData();
      })
    }
    this.nueva_paciente = null
    $("#addModal").modal('hide');
  }

  openEdit(to_edit){
    this.edit_paciente = JSON.parse(JSON.stringify(to_edit))
    $("#editModal").modal('show');
  }

  closeEdit(send){
    if(send){
      this._pacienteService.put(this.edit_paciente).subscribe(()=>{
        this.getData();
      })
    }
    this.edit_paciente = {
      descripcion : null
    }
    $("#editModal").modal('hide');
  }

  openDelete(to_delete){
    this.delete_paciente = JSON.parse(JSON.stringify(to_delete))
    $("#deleteModal").modal('show');
  }

  closeDelete(send){
    if(send){
      this._pacienteService.delete(this.delete_paciente['idCategoria']).subscribe(()=>{
        this.getData();
      })
    }
    this.delete_paciente = {
      descripcion : null
    }
    $("#deleteModal").modal('hide');
  }

 
  probar() {
    console.log(this.busquedaExacta)
  }
}






  /* this._pacienteService.getPersona().subscribe(data =>{
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
    
  } */