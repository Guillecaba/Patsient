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
}