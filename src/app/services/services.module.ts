import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from './categoria.service';
import { SubcategoriaService } from './subcategoria.service';
import { PresentacionService } from './presentacion.service';
import { ReportesService } from './reportes.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    CategoriaService,
    SubcategoriaService,
    PresentacionService,
    ReportesService,
  ]
})
export class ServicesModule { }
