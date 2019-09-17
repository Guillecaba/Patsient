import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { FichaService } from '../../services/fichas.service'
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ServicioService } from 'src/app/services/servicio.service';


declare const $: any;

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

  fecha_reserva:string;

  actualCliente: number;
  actualClienteNombre: string;
  actualEmpleado: number;
  actualEmpleadoNombre: string;

  fichas;

  forma;
  editarForm;
  observacion=null;

  actualClienteForm: number;
  actualClienteNombreForm: string;
  actualEmpleadoForm: number;
  actualEmpleadoNombreForm: string;

  categorias;
  subcategorias;

  actualCategoriaDescripcion;
  actualCategoria;

  actualSubCategoria;
  actualSubCategoriaDescripcion;

  verDetalle;

  servicios;

  servicioDetalle;


  

  private orderBy = null;
  private orderDir = null;

  
  constructor( public _pacienteService: PacienteService,public _fichasService:FichaService, public _categoriaService: CategoriaService, public _subcategoriaService:SubcategoriaService,public _servicioService:ServicioService, public datePipe: DatePipe) { }

  ngOnInit() {
    this.forma = new FormGroup({
      
      idEmpleado :new FormControl('',Validators.required),
      idCliente:new FormControl('',Validators.required),
     // categoria:new FormControl('',Validators.required),
      idTipoProducto: new FormControl('',Validators.required),
      motivoConsulta:new FormControl(''),
      diagnostico: new FormControl(''),
      observacion: new FormControl('')
    })

    this._pacienteService.getTodos().subscribe((res: any) => (
      this.pacientes = res['lista']
    ));
    this._pacienteService.getTodosEmpleados().subscribe((res: any) => (
      this.empleados = res['lista']
    ));
    this._categoriaService.all().subscribe((res:any) => {
      this.categorias = res['lista']
      console.log(this.categorias) 
    }
     
      
    )
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

  setClienteForm(cliente: any) {
    console.log(cliente)
    this.forma.patchValue({
      idCliente:{ idPersona: cliente.idPersona}
        
      }
    )
    console.log(this.forma.value)
    this.actualClienteForm = cliente['idPersona'];
    this.actualClienteNombreForm = cliente['nombre'];
    //console.log('Cliente: ' + this.actualCliente + '\nEmpleado: ' + this.actualEmpleado);
  }
  setEmpleadoForm(empleado: any) {
    
    console.log(empleado)
    this.forma.patchValue({
      idEmpleado:{ idPersona:empleado.idPersona }
    })
    console.log(this.forma.value)
    this.actualEmpleadoForm = empleado['idPersona'];
    
    this.actualEmpleadoNombreForm = empleado['nombre'];
    console.log('Cliente: ' + this.actualCliente + '\nEmpleado: ' + this.actualEmpleado);
  }

  setCategoriaForm(categoria){
    this.actualCategoria=categoria['idCategoria']
    this.actualCategoriaDescripcion= categoria['descripcion'];
    this._subcategoriaService.get({ejemplo:encodeURIComponent(JSON.stringify({
      idCategoria:{idCategoria:this.actualCategoria}

    }

    ))}).subscribe(res => {
      this.subcategorias = res['lista']
      console.log(this.subcategorias)
    })
    
    
  }


  setSubcategoriaForm(subCategoria) {
    this.actualSubCategoria = subCategoria['idTipoProducto'];
    this.actualSubCategoriaDescripcion = subCategoria['descripcion']
    
    this.forma.patchValue({
      idTipoProducto:{idTipoProducto:this.actualSubCategoria}
    })
    console.log(this.forma.value)
  }



  setFechaReserva(event: any) {
    console.log(event.target.value)
    this.fecha_reserva = event.target.value;
    this.fecha_reserva = this.datePipe.transform(this.fecha_reserva, 'yyyyMMdd');
    console.log('Fecha Reserva:' + this.fecha_reserva );
  }

  

  buscar() {
    const json = {idPersona:this.actualEmpleado}
    console.log(json)
    console.log(this.actualSubCategoria)
    
    this._fichasService.get({
      ejemplo:encodeURIComponent(JSON.stringify({
        fechaDesdeCadena: this.fecha_inicio,
        fechaHastaCadena:this.fecha_fin,
        idEmpleado:{idPersona:this.actualEmpleado},
        idCliente:{idPersona:this.actualCliente},
        idTipoProducto:{idTipoProducto:this.actualSubCategoria},
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
  this.actualSubCategoria=null
  this.actualSubCategoriaDescripcion=null
  this.actualCategoriaDescripcion=null
  this.actualCategoria=null;
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

closeDetalle(send){
  this.verDetalle = null
  //this.nueva_ficha = null
  $("#verModal").modal('hide');
}

openDetalle(detalle){
  console.log(detalle)
  this.verDetalle = detalle;
  //this.detalle = JSON.parse(JSON.stringify(to_delete))
  $("#verModal").modal('show');

}

openEdit(detalle){
  this.observacion=detalle.observacion;
  this.verDetalle=detalle
  console.log(this.verDetalle)
  this._servicioService.get({ejemplo:encodeURIComponent(JSON.stringify({
    idFichaClinica:{idFichaClinica:this.verDetalle['idFichaClinica']}

  }

  ))}).subscribe((res)=> {
    this.servicios = res['lista']
    console.log(this.servicios)
    $("#editarModal").modal('show');
  })
 
}

closeEdit(send){
  if(send){
    const data = {
      idFichaClinica:this.verDetalle.idFichaClinica
    ,observacion:this.observacion}
    console.log(data)

    this._fichasService.put(data).subscribe(()=>{
      this.getData();
      
      
    })
  }
  this.verDetalle=null;
  this.observacion =null;
  $("#editarModal").modal('hide');
}

openServicioDetalle(servicio){
  
  console.log(servicio)
  this.servicioDetalle = servicio;
  console.log(this.servicioDetalle)
  
  $('#verServicioModal').modal('show');
  
}

closeServicioDetalle(){
  this.servicioDetalle =null;
  $('#verServicioModal').modal('hide');
}


}
