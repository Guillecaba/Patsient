import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ExcepcionService {

  URL = 'https://gy7228.myfoscam.org:8443/stock-pwfe/horarioExcepcion';
  urlActual;
  fecha;
  empleado;

  constructor(public http: HttpClient) {
    this.fecha = null;
    this.empleado = null;
  }


  getPersona(fecha?, empleado?) {
    this.fecha = null;
    this.empleado = null;
    if (fecha != null) {
      this.fecha = fecha;
    }
    if (empleado) {
      this.empleado = empleado;
    }
    this.generarUrl();
    return this.http.get(this.urlActual);

  }

  public post(datos) {
    console.log(datos);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'gustavo'
    });
    return this.http.post(this.URL, datos, { headers });
  }

  public put(datos) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'gustavo'
    });
    return this.http.put(this.URL, datos, { headers });
  }

  public delete(id) {
    const url = this.URL + '/' + id;
    return this.http.delete(url);
  }

  generarUrl() {
    if (
      this.fecha != null ||
      this.empleado != null
    ) {
      this.urlActual = this.URL + '/?';
      if (this.empleado != null && this.fecha == null) {
        const query = { idEmpleado: { idPersona: this.empleado } };
        const convertido = JSON.stringify(query);
        this.urlActual = this.urlActual + 'ejemplo=' + encodeURIComponent(convertido);
        console.log(this.urlActual);
      } else if (this.empleado != null && this.fecha != null) {
        const query = { fechaCadena: this.fecha, idEmpleado: { idPersona: this.empleado } };
        const convertido = JSON.stringify(query);
        this.urlActual = this.urlActual + 'ejemplo=' + encodeURIComponent(convertido);
        console.log(this.urlActual);
      } else {
        const query = { fechaCadena: this.fecha };
        const convertido = JSON.stringify(query);
        this.urlActual = this.urlActual + 'ejemplo=' + encodeURIComponent(convertido);
        console.log(this.urlActual);
      }
    } else {
      this.urlActual = this.URL + '/';
      console.log(this.urlActual)
    }


  }

}
