import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  URL ='https://gy7228.myfoscam.org:8443/stock-pwfe/persona';
  urlActual;
  ordenDir;
  ordenPor;
  nombre;

  constructor(public  http: HttpClient) { 
    this.ordenDir = null;
    this.ordenPor = null;
    

   }


  getPersona(ordenadoPor?,ordenadoDireccion?,nombre?) {
    /* this.ordenDir=null
    this.ordenPor=null */
    this.nombre=null
    if(ordenadoPor){
      this.ordenPor =ordenadoPor;
    }
    if(ordenadoDireccion){
      this.ordenDir= ordenadoDireccion;
    }
    if(nombre) {
      this.nombre = nombre;
    }
    this.generarUrl();
    return this.http.get(this.urlActual);

  }

 



  generarUrl() {
    if (
      this.ordenPor != null ||
      this.ordenDir != null ||
      this.nombre != null && this.nombre !== ""
    ) {
      this.urlActual = this.URL + '/?';
      if (this.ordenPor != null) {
        this.urlActual = this.urlActual + '&orderBy=' + this.ordenPor;
        console.log(this.urlActual)
      }
      if (this.ordenDir != null) {
        this.urlActual = this.urlActual + '&orderDir=' + this.ordenDir;
        console.log(this.urlActual)
      }
      if(this.nombre != null) {
        let query= {nombre:this.nombre}
        let convertido = JSON.stringify(query)
        this.urlActual = this.urlActual + "ejemplo=" + encodeURIComponent(convertido) ;
        console.log(this.urlActual);
      }
    } else {
      this.urlActual = this.URL +'/' ;
      console.log(this.urlActual)
    }


  }
  
}
