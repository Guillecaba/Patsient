import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AgendaService {
    private base_url = "https://gy7228.myfoscam.org:8443/stock-pwfe/";
    // idCliente: number;
    idProfesional: number;
    fecha: string;
    soloDisponible: boolean;
    urlActual: string;

    constructor(private http: HttpClient) {
        this.idProfesional = null;
        this.fecha = null;
        this.soloDisponible = false;
    }

    getReservas(idPro: number, fech: string, libres: boolean) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.fecha = fech;
        this.idProfesional = idPro;
        this.soloDisponible = libres;
        this.crearURL();
        return this.http.get(this.urlActual, { headers });
    }

    crearURL() {
        this.urlActual = this.base_url + 'persona/';
        this.urlActual = this.urlActual + this.idProfesional + '/agenda?fecha=';
        this.urlActual = this.urlActual + this.fecha;
        if (this.soloDisponible) {
            this.urlActual = this.urlActual + '&disponible=S';
        }
    }
}