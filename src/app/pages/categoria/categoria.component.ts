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

  private search:String = "";
  private isExacta = false;
  
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
      like:this.isExacta || this.search.length == 0 ? null : 'S',
      ejemplo:this.search.length == 0? null
        : encodeURIComponent(JSON.stringify({
          descripcion : this.search
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
        this.showNotification('success','La categoría ha sido creada correctamente');
      },(error)=>{
        this.showNotification('warning','No se ha podido crear la categoría');
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
        this.showNotification('success','La categoría ha sido editada correctamente');
      },(error)=>{
        this.showNotification('warning','No se ha podido actualizar la categoría');
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
        this.showNotification('success','La categoría ha sido eliminada correctamente');
      },(error)=>{
        this.showNotification('warning','No se ha podido eliminar la categoría');
      })
    }
    this.delete_categoria = {
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
