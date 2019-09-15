import { Component, OnInit } from '@angular/core';
import { PresentacionService } from 'src/app/services/presentacion.service';
import { PageEvent } from '@angular/material/paginator';


declare const $: any;

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent implements OnInit {

  private cat : any[] = [];
  private sub : any[] = [];
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

  idSubCategoria = null;
  labelSubCategoria = null;
  selectedSubCategoria = {
    idTipoProducto:null
  };

  idProducto = null;
  
  private pagination = {
    inicio: 0,
    cantidad: 10,
  }
  private orderBy = null;
  private orderDir = null;

  private columns = [
    {
      label:'Id',
      value:'idPresentacionProducto',
      width:'10%'
    },
    {
      label:'Nombre',
      value:'nombre',
      width:'30%'
    },
    {
      label:'Descripcion',
      value:'descripcion',
      width:'30%'
    },
  ]
  private nueva: any = {
    nombre: null,
    descripcion : null,
    idProducto : {
      idProducto:null,
    }
  };
  private edit: any = {
    descripcion : null ,
    idCategoria : {
      idCategoria : null
    }
  };
  private delete: any = {};

  constructor(private service:PresentacionService) { }

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
        idProducto:{
          idTipoProducto:{
            idTipoProducto:this.selectedSubCategoria.idTipoProducto,
            idCategoria:{
              idCategoria:this.selectedCategoria.idCategoria
            },
          }
        },
        nombre:this.search.length>0?this.search:null
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

  get_sub_categorias(){
    let param = this.labelSubCategoria == null ? '' : this.labelSubCategoria;
    let param2 = this.selectedCategoria.idCategoria + ""
    this.service.getSubCat(param,param2).subscribe((resp)=>{
      this.sub = resp['lista']
    })
  }

  get_producto(){
    let param = this.selectedSubCategoria.idTipoProducto == null 
      ? '' 
      : this.selectedSubCategoria.idTipoProducto

    this.service.getProducto(param).subscribe((resp)=>{
      if(resp['totalDatos']> 0) {
        this.idProducto = resp['lista'][0]['idProducto']
      }else{
        this.idProducto = -1
      }
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
      let code = (new Date()).toISOString()
      console.log(code)
      code = code.replace("-","").replace("T","").replace("-","").replace(":","").replace(":","")
      console.log(code)
      code = code.substring(4,12)
      console.log(code)
      this.nueva.codigo = code +this.count + this.idProducto
      this.nueva.idProducto.idProducto = this.idProducto
      this.service.post(this.nueva)
      .subscribe(()=>{
        this.getData();
        this.showNotification('success','La presentación ha sido creada correctamente');
      },(error)=>{
        this.showNotification('warning','No se ha podido crear la presentación');
      })
    }
    this.nueva = {
      nombre: null,
      descripcionGeneral : null,
      idProducto : {
        idProducto:null,
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
        this.showNotification('success','La presentación ha sido editada correctamente');
      },(error)=>{
        this.showNotification('warning','No se ha podido actualizar la presentación');
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
      this.service.delete(this.delete['idPresentacionProducto']).subscribe(()=>{
        this.getData();
        this.showNotification('success','La presentación ha sido eliminada correctamente');
      },(error)=>{
        this.showNotification('warning','No se ha podido eliminar la presentación');
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
