import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { FichaService } from '../../services/fichas.service'
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styles: [],
  providers:[DatePipe]
})
export class FichaComponent implements OnInit {


  private data : any[] = [];
  private count : Number = 0;

  private pagination = {
    inicio: 0,
    cantidad: 10,
  }

  private columns = [
    {
      label:'Fecha',
      value:'fechaHora',
      //width:'10%'
    },
    {
      label:'Profesional',
      value:'idEmpleado',
      value2:'nombreCompleto'
      //width:'45%',
    },
    {
      label:'Cliente',
      value:'idCliente',
      value2:'nombreCompleto',
    },{
      label:'Categoria',
      value:'idTipoProducto',
      value2:'idCategoria',
      value3:'descripcion'
    },
    {
      label:'Subcategoria',
      value:'idTipoProducto',
      value2:'descripcion'
    }
  
  ]

  pacientes: any;
  empleados: any;

   // inputs
   fecha1;
   fecha2;

  fecha_inicio: string;
  fecha_fin: string;

  actualCliente: number;
  actualClienteNombre: string;
  actualEmpleado: number;
  actualEmpleadoNombre: string;

  fichas;

  forma

  private orderBy = null;
  private orderDir = null;

  
  constructor( public _pacienteService: PacienteService,public _fichasService:FichaService,  public datePipe: DatePipe) { }

  ngOnInit() {
    this.forma = new FormGroup({
      fecha: new FormControl('',),
      empleado :new FormControl(''),
      cliente:new FormControl(''),
      categoria:new FormControl(''),
      subcategoria: new FormControl(''),
      motivo:new FormControl('')
    })

    this._pacienteService.getTodos().subscribe((res: any) => (
      this.pacientes = res['lista']
    ));
    this._pacienteService.getTodosEmpleados().subscribe((res: any) => (
      this.empleados = res['lista']
    ));
    this.getData()
    
  }


  getData(){
    
    
      this._fichasService.get({
        ...this.pagination,
        orderBy:this.orderBy,
        orderDir:this.orderDir,
      })
      .subscribe((response)=>{
        this.data = response['lista']
        this.count = response['totalDatos']
        console.log(this.data)
      })
    }
    
  


  setFechaInicio(event: any) {
    this.fecha_inicio = event.target.value;
    this.fecha_inicio = this.datePipe.transform(this.fecha_inicio, 'yyyyMMdd');
    console.log('Fecha ini:' + this.fecha_inicio + '\nFecha fin:' + this.fecha_fin);
  }
  setFechaFin(event: any) {
    this.fecha_fin = event.target.value;
    this.fecha_fin = this.datePipe.transform(this.fecha_fin, 'yyyyMMdd');
    console.log('Fecha ini:' + this.fecha_inicio + '\nFecha fin:' + this.fecha_fin);
  }

  setCliente(cliente: any) {
    this.actualCliente = cliente['idPersona'];
    this.actualClienteNombre = cliente['nombre'];
    console.log('Cliente: ' + this.actualCliente + '\nEmpleado: ' + this.actualEmpleado);
  }
  setEmpleado(empleado: any) {
    this.actualEmpleado = empleado['idPersona'];
    this.actualEmpleadoNombre = empleado['nombre'];
    console.log('Cliente: ' + this.actualCliente + '\nEmpleado: ' + this.actualEmpleado);
  }

  buscar() {
    const json = {idPersona:this.actualEmpleado}
    console.log(json)
    
    this._fichasService.get({
      ejemplo:encodeURIComponent(JSON.stringify({
        fechaDesdeCadena: this.fecha_inicio,
        fechaHastaCadena:this.fecha_fin,
        idEmpleado:{idPersona:this.actualEmpleado},
        idCliente:{idPersona:this.actualCliente}
    }))}).subscribe((response)=>{
      this.data = response['lista']
      this.count = response['totalDatos']
    })
      
     
     
    ;

}


limpiarFiltros() {
  this.fecha_inicio = null;
  this.fecha_fin = null;
  this.actualEmpleado = null;
  this.actualEmpleadoNombre = null;
  this.actualCliente = null;
  this.actualClienteNombre = null;
  this.fecha1 = null;
  this.fecha2 = null;
}

closeAdd(send){
  if(send){
    console.log(this.forma.value)
    this._fichasService.post(this.forma.value).subscribe(()=>{
      this.getData();
    })
  }
  //this.nueva_ficha = null
  $("#addModal").modal('hide');
}



}
