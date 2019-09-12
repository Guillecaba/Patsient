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
    fecha_inicio: Date;
    fecha_fin: Date;
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

    crearURL() {
        this.urlActual = this.base_url + 'reserva';
        // si existe algun filtro
        if (
            this.idCliente != null ||
            this.idProfesional != null ||
            this.fecha_fin != null ||
            this.fecha_inicio != null
        ) {
            this.urlActual = this.urlActual + '/?';
            /*if (this.idCliente != null) {

            }*/
        }

    }
}