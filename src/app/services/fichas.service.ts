import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FichaService {
  private url_base = "https://gy7228.myfoscam.org:8443/stock-pwfe/";
  //URL ='https://gy7228.myfoscam.org:8443/stock-pwfe/persona';

  idCliente: number;
  idProfesional: number;
  urlActual: string;

  constructor(public http: HttpClient) {


  }
  public all() {
    let url = this.url_base + 'fichaClinica'
    return this.http.get(url)
  }

  public get(filters) {
    let separator = '?'
    let url = this.url_base + 'fichaClinica'
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

  public getFichasR(idCli: number, idEmp: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.idCliente = idCli;
    this.idProfesional = idEmp;
    this.crearURL();
    return this.http.get(this.urlActual);
  }



  public post(data) {
    const body = JSON.stringify(data);
    let url = this.url_base + 'fichaClinica'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });

    return this.http.post(url, data, { headers })
  }

  public put(data) {
    const body = JSON.stringify(data);
    let url = this.url_base + 'fichaClinica/'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });

    return this.http.put(url, data, { headers })
  }

  public delete(id) {
    let url = this.url_base + "fichaClinica/" + id
    return this.http.delete(url)
  }
  crearURL() {
    this.urlActual = this.url_base + 'fichaClinica';
    // si existe algun filtro
    let coma = false;
    if (
      this.idCliente != null ||
      this.idProfesional != null
    ) {
      this.urlActual = this.urlActual + '?ejemplo=%7B';
      if (this.idProfesional != null) {
        this.urlActual = this.urlActual + '"idEmpleado"%3A%7B"idPersona"%3A' + this.idProfesional + '%7D';
        coma = true;
      }
      if (this.idCliente != null) {
        if (coma) {
          this.urlActual = this.urlActual + ',';
        }
        this.urlActual = this.urlActual + '"idCliente"%3A%7B"idPersona"%3A' + this.idCliente + '%7D';
        coma = true;
      }
      this.urlActual = this.urlActual + '%7D';
    }

  }
}