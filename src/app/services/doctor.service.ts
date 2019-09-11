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
  inicio;
  cantidad;
  orderBy;
  orderDir;

  constructor(public http: HttpClient) {
    this.dia = null;
    this.empleado = null;
    this.inicio = null;
    this.cantidad = null;
    this.orderBy = null;
    this.orderDir = null;
  }


  getPersona(dia?, empleado?, inicio?, cantidad?, orderBy?, orderDir?) {
    this.dia = null;
    this.empleado = null;
    this.inicio = null;
    this.cantidad = null;
    this.orderBy = null;
    this.orderDir = null;
    if (dia != null) {
      this.dia = dia;
    }
    if (empleado != null) {
      this.empleado = empleado;
    }
    if (inicio != null) {
      this.inicio = inicio;
    }
    if (cantidad != null) {
      this.cantidad = cantidad;
    }
    if (orderBy != null) {
      this.orderBy = orderBy;
    }
    if (orderDir != null) {
      this.orderDir = orderDir;
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
    let primero = 1;
    if (
      this.dia != null ||
      this.empleado != null ||
      this.inicio != null ||
      this.cantidad != null ||
      this.orderBy != null ||
      this.orderDir != null
    ) {
      this.urlActual = this.URL + '?';
      if (this.inicio != null) {
        if (primero === 0) {
          this.urlActual = this.urlActual + '&';
        } else {
          primero = 0;
        }
        this.urlActual = this.urlActual + 'inicio=' + this.inicio;
      }
      if (this.cantidad != null) {
        if (primero === 0) {
          this.urlActual = this.urlActual + '&';
        } else {
          primero = 0;
        }
        this.urlActual = this.urlActual + 'cantidad=' + this.cantidad;
      }
      if (this.orderBy != null) {
        if (primero === 0) {
          this.urlActual = this.urlActual + '&';
        } else {
          primero = 0;
        }
        this.urlActual = this.urlActual + 'orderBy=' + this.orderBy;
      }
      if (this.orderDir != null) {
        if (primero === 0) {
          this.urlActual = this.urlActual + '&';
        } else {
          primero = 0;
        }
        this.urlActual = this.urlActual + 'orderDir=' + this.orderDir;
      }
      if (this.empleado != null && this.dia == null) {
        const query = { idEmpleado: { idPersona: this.empleado } };
        const convertido = JSON.stringify(query);
        if (primero === 0) {
          this.urlActual = this.urlActual + '&';
        } else {
          primero = 0;
        }
        this.urlActual = this.urlActual + 'ejemplo=' + encodeURIComponent(convertido);
      } else if (this.empleado != null && this.dia != null) {
        const query = { dia: this.dia, idEmpleado: { idPersona: this.empleado } };
        const convertido = JSON.stringify(query);
        if (primero === 0) {
          this.urlActual = this.urlActual + '&';
        } else {
          primero = 0;
        }
        this.urlActual = this.urlActual + 'ejemplo=' + encodeURIComponent(convertido);
      } else {
        const query = { dia: this.dia };
        const convertido = JSON.stringify(query);
        if (primero === 0) {
          this.urlActual = this.urlActual + '&';
        } else {
          primero = 0;
        }
        this.urlActual = this.urlActual + 'ejemplo=' + encodeURIComponent(convertido);
      }
    } else {
      this.urlActual = this.URL + '/';
    }


  }

}
