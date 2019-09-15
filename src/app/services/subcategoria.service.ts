import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  private url_base = "https://gy7228.myfoscam.org:8443/stock-pwfe/";

  constructor(private http: HttpClient) { }

  public all() {
    let url = this.url_base + "tipoProducto"
    return this.http.get(url)
  }

  public getCat(like) {
    let url = this.url_base + "categoria?like=S&inicio=0&cantidad=5";
    if (like.length > 0) {
      url = url + "&ejemplo=" + encodeURIComponent(JSON.stringify({
        descripcion: like
      }))
    }
    return this.http.get(url)
  }

  public get(filters) {
    let separator = '?'
    let url = this.url_base + "tipoProducto"
    for (let k in filters) {
      if (filters[k] == null) continue
      url = url + separator + k + "=" + filters[k]
      separator = "&"
    }
    return this.http.get(url)
  }

  public post(data) {
    let url = this.url_base + "tipoProducto"
    return this.http.post(url, data)
  }

  public put(data) {
    let url = this.url_base + "tipoProducto"
    return this.http.put(url, data)
  }

  public delete(id) {
    let url = this.url_base + "tipoProducto/" + id
    return this.http.delete(url)
  }

  public getTodos() {
    const url = this.url_base + 'tipoProducto/';
    return this.http.get(url);
  }

  public getDeCategoria(idCat: number) {
    let url = this.url_base + 'tipoProducto?ejemplo=%7B"idCategoria"%3A%7B"idCategoria"%3A';
    url = url + idCat + '%7D%7D';
    return this.http.get(url);
  }

  public getPresentacionDeSubcat(idSub: number) {
    let url = this.url_base + 'presentacionProducto?ejemplo=%7B%22idProducto%22%3A';
    url = url + '%7B%22idTipoProducto%22%3A%7B%22idTipoProducto%22%3A';
    url = url + idSub + '%7D%7D%7D';
    return this.http.get(url);
  }
}
