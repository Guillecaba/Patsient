import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class DetallesService {
    private base_url = "https://gy7228.myfoscam.org:8443/stock-pwfe/";

    constructor(private http: HttpClient) { }


    getDetallesServicio(idSer: number) {
        const url = this.base_url + 'servicio/' + idSer + '/detalle';
        return this.http.get(url);
    }

    post(idSer: number, body: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'usuario': 'gustavo'
        });
        const url = this.base_url + 'servicio/' + idSer + '/detalle';
        return this.http.post(url, body, { headers });
    }
    delete(idSer: number, idSD: number) {
        const url = this.base_url + 'servicio/' + idSer + '/detalle/' + idSD;
        return this.http.delete(url);
    }
}