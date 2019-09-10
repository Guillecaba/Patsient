import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  URL = 'https://gy7228.myfoscam.org:8443/stock-pwfe/personaHorarioAgenda';
  urlActual;
  dia;
  empleado;

  constructor(public http: HttpClient) {
    this.dia = null;
    this.empleado = null;
  }


  getPersona(dia?, empleado?) {
    this.dia = null;
    this.empleado = null;
    if (dia != null) {
      this.dia = dia;
    }
    if (empleado) {
      this.empleado = empleado;
    }
    this.generarUrl();
    return this.http.get(this.urlActual);

  }

  public post(datos) {
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
      this.dia != null ||
      this.empleado != null
    ) {
      this.urlActual = this.URL + '/?';
      if (this.empleado != null && this.dia == null) {
        const query = { idEmpleado: { idPersona: this.empleado } };
        const convertido = JSON.stringify(query);
        this.urlActual = this.urlActual + 'ejemplo=' + encodeURIComponent(convertido);
        console.log(this.urlActual);
      } else if (this.empleado != null && this.dia != null) {
        const query = { dia: this.dia, idEmpleado: { idPersona: this.empleado } };
        const convertido = JSON.stringify(query);
        this.urlActual = this.urlActual + 'ejemplo=' + encodeURIComponent(convertido);
        console.log(this.urlActual);
      } else {
        const query = { dia: this.dia };
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
