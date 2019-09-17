import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private url_base = "https://gy7228.myfoscam.org:8443/stock-pwfe/";
  //URL ='https://gy7228.myfoscam.org:8443/stock-pwfe/persona';

  constructor(public http: HttpClient) {


  }
  public all() {
    let url = this.url_base + "persona"
    return this.http.get(url)
  }

  public get(filters) {
    let separator = '?'
    let url = this.url_base + "persona"
    for (let k in filters) {
      if (filters[k] == null) {
        continue
      }
      url = url + separator + k + "=" + filters[k]
      separator = "&"
    }
    console.log(url)
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

  public filtrarEmpleados(nombre?, apellido?) {
    let url = this.url_base + 'persona?orderBy=apellido&orderDir=asc&like=S&ejemplo=';
    if (nombre !== null && apellido !== null) {
      const query = { soloUsuariosDelSistema: true, nombre: nombre, apellido: apellido };
      const convertido = JSON.stringify(query);
      url = url + encodeURIComponent(convertido);
    } else if (nombre !== null && apellido === null) {
      const query = { soloUsuariosDelSistema: true, nombre: nombre };
      const convertido = JSON.stringify(query);
      url = url + encodeURIComponent(convertido);
    } else if (nombre === null && apellido !== null) {
      const query = { soloUsuariosDelSistema: true, apellido: apellido };
      const convertido = JSON.stringify(query);
      url = url + encodeURIComponent(convertido);
    } else {
      const query = { soloUsuariosDelSistema: true };
      const convertido = JSON.stringify(query);
      url = url + encodeURIComponent(convertido);
    }
    return this.http.get(url);
  }

  public filtrarPacientes(nombre?, apellido?) {
    let url = this.url_base + 'persona?orderBy=apellido&orderDir=asc&like=S&ejemplo=';
    if (nombre !== null && apellido !== null) {
      const query = { nombre: nombre, apellido: apellido };
      const convertido = JSON.stringify(query);
      url = url + encodeURIComponent(convertido);
    } else if (nombre !== null && apellido === null) {
      const query = { nombre: nombre };
      const convertido = JSON.stringify(query);
      url = url + encodeURIComponent(convertido);
    } else if (nombre === null && apellido !== null) {
      const query = { apellido: apellido };
      const convertido = JSON.stringify(query);
      url = url + encodeURIComponent(convertido);
    }
    return this.http.get(url);
  }

  public post(data) {
    const body = JSON.stringify(data);
    let url = this.url_base + "persona"
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });

    return this.http.post(url, data, { headers })
  }

  public put(data) {
    const body = JSON.stringify(data);
    let url = this.url_base + "persona/"
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });

    return this.http.put(url, data, { headers })
  }

  public delete(id) {
    let url = this.url_base + "persona/" + id
    return this.http.delete(url)
  }
  /*
  
    public getTodos() {
      let url = this.url_base + 'persona?orderBy=apellido&orderDir=asc';
      return this.http.get(url);
    }
  
    public getTodosEmpleados() {
      let url = this.url_base + 'persona?orderBy=apellido&orderDir=asc&ejemplo=%7B"soloUsuariosDelSistema"%3Atrue%7D';
      return this.http.get(url);
    }
  */



}
