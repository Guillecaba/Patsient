import { Component, OnInit } from '@angular/core';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { PageEvent } from '@angular/material/paginator'; 

declare const $: any;

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {

  private cat : any[] = [];
  private data : any[] = [];
  private count : Number = 0;

  private search:String = "";
  private isExacta = false;
  
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent;

  idCategoria = null;
  labelCategoria = null;
  selectedCategoria = {
    idCategoria:null
  };
  
  private pagination = {
    inicio: 0,
    cantidad: 10,
  }
  private orderBy = null;
  private orderDir = null;

  private columns = [
    {
      label:'Id',
      value:'idTipoProducto',
      width:'10%'
    },
    {
      label:'Descripcion',
      value:'descripcion',
      width:'40%'
    },
  ]
  private nueva: any = {
    descripcion : null,
    idCategoria : {
      idCategoria : null
    }
  };
  private edit: any = {
    descripcion : null ,
    idCategoria : {
      idCategoria : null
    }
  };
  private delete: any = {};

  constructor(private service:SubcategoriaService) { }

  ngOnInit() {
    this.getData()
    this.get_categorias()
  }



  getData(){
    this.service.get({
      ...this.pagination,
      orderBy:this.orderBy,
      orderDir:this.orderDir,
      like:this.isExacta || this.search.length == 0 ? null : 'S',
      ejemplo:encodeURIComponent(JSON.stringify({
        idCategoria:this.selectedCategoria.idCategoria,
        descripcion:this.search.length>0?this.search:null
      }))
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

  get_categorias(){
    let param = this.labelCategoria == null ? '' : this.labelCategoria;
    this.service.getCat(param).subscribe((resp)=>{
      this.cat = resp['lista']
    })
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
      this.nueva.idCategoria = this.selectedCategoria
      this.service.post(this.nueva)
      .subscribe(()=>{
        this.getData();
        this.showNotification('success','La sub-categoría ha sido creada correctamente');
      },(error)=>{
        this.showNotification('warning','No se ha podido crear la sub-categoría');
      })
    }
    this.nueva = {
      descripcion : null,
      idCategoria : {
        idCategoria : null
      }
    }
    $("#addModal").modal('hide');
  }

  openEdit(to_edit){
    this.edit = JSON.parse(JSON.stringify(to_edit))
    $("#editModal").modal('show');
  }

  closeEdit(send){
    if(send){
      this.service.put(this.edit).subscribe(()=>{
        this.getData();
        this.showNotification('success','La sub-categoría ha sido editada correctamente');
      },(error)=>{
        this.showNotification('warning','No se ha podido actualizar la sub-categoría');
      })
    }
    this.edit = {
      descripcion : null
    }
    $("#editModal").modal('hide');
  }

  openDelete(to_delete){
    this.delete = JSON.parse(JSON.stringify(to_delete))
    $("#deleteModal").modal('show');
  }

  closeDelete(send){
    if(send){
      this.service.delete(this.delete['idTipoProducto']).subscribe(()=>{
        this.getData();
        this.showNotification('success','La sub-categoría ha sido eliminada correctamente');
      },(error)=>{
        this.showNotification('warning','No se ha podido eliminar la sub-categoría');
      })
    }
    this.delete = {
      descripcion : null
    }
    $("#deleteModal").modal('hide');
  }

  showNotification(type,message) {

    $.notify({
        icon: type == 'sucess' ? 'check_circle' : type,
        message: message
    }, {
        type: type,
        timer: 1000,
        placement: {
            from: 'top',
            align: 'center'
        },
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}
