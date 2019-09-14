import { Component, OnInit } from '@angular/core';
import { DetallesService } from 'src/app/services/detalles.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-detalles-servicio',
  templateUrl: './detalles-servicio.component.html',
  styleUrls: ['./detalles-servicio.component.css']
})
export class DetallesServicioComponent implements OnInit {

  detalles: any;
  error = false;
  idServicio;

  // inputs
  cantidad = 1;
  precio: number = null;

  categorias;
  actualCategoria: number;
  actualCategoriaNombre: string;
  actualSubcategoria: number;
  actualSubcategoriaNombre: string;

  constructor(public detallesService: DetallesService,
    public servicioService: ServicioService,
    public categoriaService: CategoriaService,
    public subcategoriaService: SubcategoriaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idServicio = id;
      this.categoriaService.getTodos().subscribe((res: any) => (
        this.categorias = res['lista']
      ));
      this.servicioService.getTodosServicios().subscribe((res: any[]) => {
        const lista = res['lista'];
        let encontro = false;
        for (let item of lista) {
          if (item.idServicio === id) {
            encontro = true;
            break;
          }
        }
        if (!encontro) {
          this.error = true;
        }
      });
      this.detallesService.getDetallesServicio(this.idServicio).subscribe((res: any) => {
        this.detalles = res;
      });
    } else {
      this.error = true;
    }
  }
  setCategoria(categoria: any) {
    this.actualCategoria = categoria['idCategoria'];
    this.actualCategoriaNombre = categoria['descripcion'];
    this.actualSubcategoria = null;
    this.actualSubcategoriaNombre = null;
    this.precio = null;
    this.cantidad = 1;
    console.log('Categoria: ' + this.actualCategoria + '\nSubcategoria: ' + this.actualSubcategoria);
  }

}
