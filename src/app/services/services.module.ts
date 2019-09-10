import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from './categoria.service';
import { SubcategoriaService } from './subcategoria.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    CategoriaService,
    SubcategoriaService,
  ]
})
export class ServicesModule { }
