import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PacienteService } from 'src/app/services/paciente.service';
import { FichaService } from 'src/app/services/fichas.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editor-servicio',
  templateUrl: './editor-servicio.component.html',
  styleUrls: ['./editor-servicio.component.css']
})
export class EditorServicioComponent implements OnInit {

  nuevo: boolean;
  error = false;
  tituloPagina: string;
  idServicio: number;

  fecha1;
  observacion: string;
  actualFicha;

  fichas: any;
  pacientes: any;
  empleados: any;
  fecha: string;
  actualCliente: number;
  actualClienteNombre: string;
  actualEmpleado: number;
  actualEmpleadoNombre: string;

  // solo para edicion
  categoriaNombre: string;
  subcategoriaNombre: string;

  constructor(public pacienteService: PacienteService,
    public datePipe: DatePipe,
    public fichaService: FichaService,
    public servicioService: ServicioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tituloPagina = 'Editar Servicio';
      this.nuevo = false;
      this.idServicio = id;
      this.servicioService.getTodosServicios().subscribe((res: any[]) => {
        const lista = res['lista'];
        let encontro = false;
        for (let item of lista) {
          if (item.idServicio === id) {
            encontro = true;
            this.actualFicha = item.idFichaClinica.idFichaClinica;
            this.observacion = item.observacion;
            this.fecha1 = this.datePipe.transform(item.fechaHora, 'yyyy-MM-dd');
            this.fecha = this.datePipe.transform(this.fecha1, 'yyyyMMdd');
            this.actualClienteNombre = item.idFichaClinica.idCliente.nombreCompleto;
            this.actualEmpleadoNombre = item.idEmpleado.nombreCompleto;
            this.categoriaNombre = item.idFichaClinica.idTipoProducto.idCategoria.descripcion;
            this.subcategoriaNombre = item.idFichaClinica.idTipoProducto.descripcion;
            break;
          }
        }
        if (!encontro) {
          this.error = true;
        }
      });
    } else {
      this.tituloPagina = 'Crear Servicio';
      this.nuevo = true;
      this.idServicio = null;
      this.pacienteService.getTodos().subscribe((res: any) => (
        this.pacientes = res['lista']
      ));
      this.pacienteService.getTodosEmpleados().subscribe((res: any) => (
        this.empleados = res['lista']
      ));
    }
  }

  setCliente(cliente: any) {
    this.actualCliente = cliente['idPersona'];
    this.actualClienteNombre = cliente['nombre'];
    console.log('Cliente: ' + this.actualCliente + '\nEmpleado: ' + this.actualEmpleado);
    this.actualFicha = null;
    this.fichaService.getFichasR(this.actualCliente, this.actualEmpleado).subscribe((res: any) => (
      this.fichas = res['lista']
    ));
  }

  setEmpleado(empleado: any) {
    this.actualEmpleado = empleado['idPersona'];
    this.actualEmpleadoNombre = empleado['nombre'];
    console.log('Cliente: ' + this.actualCliente + '\nEmpleado: ' + this.actualEmpleado);
    this.actualFicha = null;
    this.fichaService.getFichasR(this.actualCliente, this.actualEmpleado).subscribe((res: any) => (
      this.fichas = res['lista']
    ));
  }

  setFecha(event: any) {
    this.fecha = event.target.value;
    this.fecha = this.datePipe.transform(this.fecha, 'yyyyMMdd');
  }

  guardarServicio() {
    let body = '{';
    body = body + '"fechaHoraCadena":"' + this.fecha + '"';
    if (this.nuevo) {
      body = body + ',"idFichaClinica":{"idFichaClinica":' + this.actualFicha + '}';
    } else if (!this.nuevo) {
      body = body + ',"idServicio":' + this.idServicio;
    }
    if (this.observacion) {
      body = body + ',"observacion":"' + this.observacion + '"';
    }
    body = body + '}';
    console.log(body);
    if (this.nuevo) {
      this.servicioService.post(body).subscribe(resul => {
        if (resul) {
          console.log('Servicio Creado Exitosamente!');
          this.router.navigateByUrl('/servicios');
        }
      });
    } else {
      this.servicioService.put(body).subscribe(resul => {
        if (resul) {
          console.log('Servicio Editado Exitosamente!');
          this.router.navigateByUrl('/servicios');
        }
      });
    }

  }

}
