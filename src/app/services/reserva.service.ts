import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ReservaService {
    private base_url = "https://gy7228.myfoscam.org:8443/stock-pwfe/";
    idCliente: number;
    idProfesional: number;
    fecha_inicio: string;
    fecha_fin: string;
    urlActual: string;

    constructor(private http: HttpClient) {
        this.idCliente = null;
        this.idProfesional = null;
        this.fecha_fin = null;
        this.fecha_inicio = null;
    }

    getTodasLasReservas() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.idCliente = null;
        this.idProfesional = null;
        this.fecha_fin = null;
        this.fecha_inicio = null;
        this.crearURL();
        return this.http.get(this.urlActual, { headers });

    }
    getReservas(fechaI: string, fechaF: string, idCli: number, idEmp: number) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.fecha_inicio = fechaI;
        this.fecha_fin = fechaF;
        this.idCliente = idCli;
        this.idProfesional = idEmp;
        this.crearURL();
        return this.http.get(this.urlActual, { headers });
    }

    postReserva(datos) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'usuario': 'gustavo'
        });
        const URL = this.base_url + 'reserva/';
        return this.http.post(URL, datos, { headers });
    }
    deleteReserva(id) {
        const URL = this.base_url + 'reserva/' + id;
        return this.http.delete(URL);
    }
    putReserva(datos) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const URL = this.base_url + 'reserva/';
        return this.http.put(URL, datos, { headers });
    }
    crearURL() {
        this.urlActual = this.base_url + 'reserva';
        // si existe algun filtro
        let coma = false;
        if (
            this.idCliente != null ||
            this.idProfesional != null ||
            this.fecha_fin != null ||
            this.fecha_inicio != null
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
            this.urlActual = this.urlActual + '%7D';
        }

    }
}