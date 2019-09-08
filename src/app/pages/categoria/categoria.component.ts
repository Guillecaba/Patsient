import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { PageEvent } from '@angular/material/paginator'; 

declare const $: any;

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  private data : any[] = [];
  private count : Number = 0;
  
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent;
  private pagination = {
    inicio: 0,
    cantidad: 10,
  }
  private orderBy = null;
  private orderDir = null;
  private columns = [
    {
      label:'Id',
      value:'idCategoria',
      width:'10%'
    },
    {
      label:'Categoría',
      value:'descripcion',
      width:'45%',
    },
  ]
  private nueva_categoria: String = null;
  private edit_categoria: any = {
    descripcion : null
  };
  private delete_categoria : any ={
    descripcion : null
  };

  constructor(private service:CategoriaService) { }

  ngOnInit() {
    this.getData()
    /*/let b = true;
    setInterval(()=>{
      $("#addModal").modal('show')
    },3000)*/
  }

  getData(){
    this.service.get({
      ...this.pagination,
      orderBy:this.orderBy,
      orderDir:this.orderDir,
    })
    .subscribe((response)=>{
      this.data = response['lista']
      this.count = response['totalDatos']
    })
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

  closeAdd(send){
    if(send){
      this.service.post({
        'descripcion' : this.nueva_categoria
      }).subscribe(()=>{
        this.getData();
      })
    }
    this.nueva_categoria = null
    $("#addModal").modal('hide');
  }

  openEdit(to_edit){
    this.edit_categoria = JSON.parse(JSON.stringify(to_edit))
    $("#editModal").modal('show');
  }

  closeEdit(send){
    if(send){
      this.service.put(this.edit_categoria).subscribe(()=>{
        this.getData();
      })
    }
    this.edit_categoria = {
      descripcion : null
    }
    $("#editModal").modal('hide');
  }

  openDelete(to_delete){
    this.delete_categoria = JSON.parse(JSON.stringify(to_delete))
    $("#deleteModal").modal('show');
  }

  closeDelete(send){
    if(send){
      this.service.delete(this.delete_categoria['idCategoria']).subscribe(()=>{
        this.getData();
      })
    }
    this.delete_categoria = {
      descripcion : null
    }
    $("#deleteModal").modal('hide');
  }
}
