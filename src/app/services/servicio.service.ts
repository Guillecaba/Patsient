import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ServicioService {
    private base_url = "https://gy7228.myfoscam.org:8443/stock-pwfe/";
    idCliente: number;
    idProfesional: number;
    /*idCategoria: number;
    idSubcategoria: number;*/
    fecha_inicio: string;
    fecha_fin: string;
    urlActual: string;

    constructor(private http: HttpClient) {
        this.idCliente = null;
        this.idProfesional = null;
        this.fecha_fin = null;
        this.fecha_inicio = null;
        /*this.idCategoria = null;
        this.idSubcategoria = null;*/
    }
    getServicios(fechaI: string, fechaF: string, idCli: number, idEmp: number/*, idCat: number, idSubc: number*/) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.fecha_inicio = fechaI;
        this.fecha_fin = fechaF;
        this.idCliente = idCli;
        this.idProfesional = idEmp;
        /*this.idCategoria = idCat;
        this.idSubcategoria = idSubc;*/
        this.crearURL();
        return this.http.get(this.urlActual, { headers });
    }
    getTodosServicios() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const url = this.base_url + 'servicio';
        return this.http.get(url, { headers });
    }
    post(body) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'usuario': 'ana'
        });
        const url = this.base_url + 'servicio';
        return this.http.post(url, body, { headers });
    }
    put(body) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'usuario': 'ana'
        });
        const url = this.base_url + 'servicio';
        return this.http.put(url, body, { headers });
    }


    public get(filters) {
        let separator = '?'
        let url = this.base_url + "servicio"
        for (let k in filters) {
          if (filters[k] == null) {
            continue
          }
          url = url + separator + k + "=" + filters[k]
          separator = "&"
        }
        return this.http.get(url)
      }

    crearURL() {
        this.urlActual = this.base_url + 'servicio';
        // si existe algun filtro
        let coma = false;
        if (
            this.idCliente != null ||
            this.idProfesional != null ||
            this.fecha_fin != null ||
            this.fecha_inicio != null /*||
            this.idCategoria != null ||
            this.idSubcategoria != null*/
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
                this.urlActual = this.urlActual + '"idFichaClinica"%3A%7B"idCliente"%3A%7B"idPersona"%3A' + this.idCliente + '%7D%7D';
                coma = true;
            }
            if (this.fecha_inicio != null) {
                if (coma) {
                    this.urlActual = this.urlActual + ',';
                }
                this.urlActual = this.urlActual + '"fechaDesdeCadena"%3A"' + this.fecha_inicio + '"';
                coma = true;
            }
            if (this.fecha_fin != null) {
                if (coma) {
                    this.urlActual = this.urlActual + ',';
                }
                this.urlActual = this.urlActual + '"fechaHastaCadena"%3A"' + this.fecha_fin + '"';
                coma = true;
            }
            /* No funciona, seguro que este filtro y categoria no corresponden a Servicio sino a Ficha medica
            if (this.idSubcategoria != null) {
                if (coma) {
                    this.urlActual = this.urlActual + ',';
                }
                this.urlActual = this.urlActual + '"idFichaClinica"%3A%7B"idTipoProducto"%3A%7B"idTipoProducto"%3A';
                this.urlActual = this.urlActual + this.idSubcategoria + '%7D%7D';
                coma = true;
            }*/
            this.urlActual = this.urlActual + '%7D';
        }

    }
}