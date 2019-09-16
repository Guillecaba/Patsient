import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { DatePipe } from '@angular/common';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FichaService } from 'src/app/services/fichas.service';

declare const $: any;

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})

export class ReservaComponent implements OnInit {

  // inputs
  fecha1;
  fecha2;
  observacion: string;
  asistio: boolean;

  idReserva: number;
  reservas: any;
  pacientes: any;
  empleados: any;
  fecha_inicio: string;
  fecha_fin: string;
  actualCliente: number;
  actualClienteNombre: string;
  actualEmpleado: number;
  actualEmpleadoNombre: string;




 /*  Para el modal de nueva ficha */
  forma;

  actualClienteForm: number;
  actualClienteNombreForm: string;
  actualEmpleadoForm: number;
  actualEmpleadoNombreForm: string;


  actualCategoriaDescripcion;
  actualCategoria;

  actualSubCategoria;
  actualSubCategoriaDescripcion;

  categorias;
  subcategorias;
  reservaFormID;


  constructor(public reservaService: ReservaService,
    public pacienteService: PacienteService,
    public datePipe: DatePipe,
    private router: Router,
    private _categoriaService:CategoriaService,
    private _subcategoriaService:SubcategoriaService,
    private _fichasService:FichaService) { }

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


    let hoy: string;

    this._categoriaService.all().subscribe((res:any) => {
      this.categorias = res['lista']
      console.log(this.categorias)
    });
    this.pacienteService.getTodos().subscribe((res: any) => (
      this.pacientes = res['lista']
    ));
    this.pacienteService.getTodosEmpleados().subscribe((res: any) => (
      this.empleados = res['lista']
    ));
    hoy = new Date().toJSON('yyyy/MM/dd').substr(0, 10);
    hoy = hoy.substr(0, 4) + hoy.substr(5, 2) + hoy.substr(8, 2);
    console.log(hoy);
    // carga todas las reservas de hoy
    this.reservaService.getReservas(hoy, hoy, null, null).subscribe((res: any) => (
      this.reservas = res['lista']
    ));
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
  buscar() {
    this.reservaService.getReservas(this.fecha_inicio, this.fecha_fin, this.actualCliente, this.actualEmpleado).subscribe((res: any) => (
      this.reservas = res['lista']
    ));
  }
  cancelarReserva(reserv: any) {
    const id = reserv.idReserva;
    this.reservaService.deleteReserva(id).subscribe();
  }
  editarReserva(reserv: any) {
    // limpia las entradas
    this.observacion = null;
    this.asistio = false;

    $('#modificarReserva').modal('show');
    const id = reserv.idReserva;
    this.idReserva = id;
    console.log(this.idReserva);
  }
  cerrar(guardar: boolean) {
    $('#modificarReserva').modal('hide');
    if (guardar) {
      let datos = '{"idReserva":';
      datos = datos + this.idReserva + ',"observacion":"';
      datos = datos + this.observacion + '","flagAsistio":"';
      if (this.asistio) {
        datos = datos + 'S';
      } else {
        datos = datos + 'N';
      }
      datos = datos + '"}';
      console.log(datos);
      this.reservaService.putReserva(datos).subscribe(res => {
        if (res) {
          console.log('Reservación modificada con éxito!');
          this.router.navigateByUrl('/');
        }
      });
    }
  }

openNuevaFicha(reserva){
  this.reservaFormID=reserva['idReserva']
  this.setClienteForm(reserva.idCliente)
  this.setEmpleadoForm(reserva.idEmpleado)
  console.log(reserva)
  $("#nuevaFicha").modal('show')
  
}

closeAdd(send){
  if(send){
    console.log(this.forma.value)
    this._fichasService.post(this.forma.value).subscribe((res)=>{
      const reservaJSON = {idReserva:this.reservaFormID,flagAsistio:"S"};
      this.reservaService.putReserva(reservaJSON).subscribe((res)=> {
console.log(res)
      })
     console.log(res)
    })
  }
  //this.nueva_ficha = null
  $("#nuevaFicha").modal('hide');
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

}
