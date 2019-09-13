import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  // inputs
  fecha1;
  fecha2;

  idServicio: number;
  servicios: any;
  pacientes: any;
  empleados: any;
  categorias: any;
  subcategorias: any;
  fecha_inicio: string;
  fecha_fin: string;
  actualCliente: number;
  actualClienteNombre: string;
  actualEmpleado: number;
  actualEmpleadoNombre: string;
  /*actualCategoria: number;
  actualCategoriaNombre: string;
  actualSubcategoria: number;
  actualSubcategoriaNombre: string;*/

  constructor(public reservaService: ReservaService,
    public pacienteService: PacienteService,
    public categoriaService: CategoriaService,
    public subcategoriaService: SubcategoriaService,
    public servicioService: ServicioService,
    public datePipe: DatePipe,
    private router: Router) { }

  ngOnInit() {
    // let hoy: string;
    this.pacienteService.getTodos().subscribe((res: any) => (
      this.pacientes = res['lista']
    ));
    this.pacienteService.getTodosEmpleados().subscribe((res: any) => (
      this.empleados = res['lista']
    ));
    /*this.categoriaService.getTodos().subscribe((res: any) => (
      this.categorias = res['lista']
    ));
    this.subcategoriaService.getTodos().subscribe((res: any) => (
      this.subcategorias = res['lista']
    ));*/
    this.servicioService.getTodosServicios().subscribe((res: any) => (
      this.servicios = res['lista']
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
  /*setCategoria(categoria: any) {
    this.actualCategoria = categoria['idCategoria'];
    this.actualCategoriaNombre = categoria['descripcion'];
    console.log('Categoria: ' + this.actualCategoria + '\nSubcategoria: ' + this.actualSubcategoria);
  }
  setSubcategoria(subcategoria: any) {
    this.actualSubcategoria = subcategoria['idTipoProducto'];
    this.actualSubcategoriaNombre = subcategoria['descripcion'];
    console.log('Categoria: ' + this.actualCategoria + '\nSubcategoria: ' + this.actualSubcategoria);
  }*/
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
    /*this.actualCategoria = null;
    this.actualCategoriaNombre = null;
    this.actualSubcategoria = null;
    this.actualSubcategoriaNombre = null;*/
    this.fecha1 = null;
    this.fecha2 = null;
  }
  buscar() {
    this.servicioService.getServicios(this.fecha_inicio, this.fecha_fin, this.actualCliente,
      this.actualEmpleado/*, this.actualCategoria, this.actualSubcategoria*/).subscribe((res: any) => (
        this.servicios = res['lista']
      ));
  }

}
