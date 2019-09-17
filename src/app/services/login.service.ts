import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL = 'https://gy7228.myfoscam.org:8443/stock-pwfe/persona';

  constructor(public http: HttpClient) {
  }


  login(usuario) {
    let coincidencias;
    // const query = { email: usuario };
    const query = { usuarioLogin: usuario, soloUsuariosDelSistema: true };
    const convertido = JSON.stringify(query);
    return this.http.get(this.URL + '?ejemplo=' + encodeURIComponent(convertido));
  }

  logout() {
    localStorage.removeItem('logged');
    localStorage.removeItem('currentUser');
  }

}
