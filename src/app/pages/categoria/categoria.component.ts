import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';

declare const $: any;

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  private data : any[] = [];
  private count : Number = 0;
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
    this.service.all().subscribe((response)=>{
      this.data = response['lista']
      this.count = response['totalDatos']
    })
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
