import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private url_base = "https://gy7228.myfoscam.org:8443/stock-pwfe/";
  //URL ='https://gy7228.myfoscam.org:8443/stock-pwfe/persona';
 
  constructor(public  http: HttpClient) { 
    

   }
   public all(){
    let url = this.url_base + "persona"
    return this.http.get(url)
  }

  public get(filters){
    let separator = '?'
    let url = this.url_base + "persona"
    for(let k in filters){
      if(filters[k] == null) {
        continue
      }
      url= url + separator + k + "=" +filters[k]
      separator = "&"
    }
    return this.http.get(url)
  }

  public getTodos() {
    let url = this.url_base + 'persona?orderBy=apellido&orderDir=asc';
    return this.http.get(url);
  }

  public getTodosEmpleados() {
    let url = this.url_base + 'persona?orderBy=apellido&orderDir=asc&ejemplo=%7B"soloUsuariosDelSistema"%3Atrue%7D';
    return this.http.get(url);
  }


  public post(data){
    let url = this.url_base + "persona"
    return this.http.post(url,data)
  }

  public put(data){
    let url = this.url_base + "persona"
    return this.http.put(url,data)
  }

  public delete(id){
    let url = this.url_base + "persona/" + id
    return this.http.delete(url)
  }


 
  
}
