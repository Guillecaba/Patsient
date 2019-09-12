import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  private url_base = "https://gy7228.myfoscam.org:8443/stock-pwfe/";

  constructor(private http:HttpClient) { }

  public all(){
    let url = this.url_base + "tipoProducto"
    return this.http.get(url)
  }

  public getCat(like){
    let url = this.url_base + "categoria?like=S&inicio=0&cantidad=5";
    if(like.length > 0){
      url = url + "&ejemplo=" + encodeURIComponent(JSON.stringify({
        descripcion:like
      }))
    }
    return this.http.get(url)
  }

  public get(filters){
    let separator = '?'
    let url = this.url_base + "tipoProducto"
    for(let k in filters){
      if(filters[k] == null)continue
      url= url + separator + k + "=" +filters[k]
      separator = "&"
    }
    return this.http.get(url)
  }

  public post(data){
    let url = this.url_base + "tipoProducto"
    return this.http.post(url,data)
  }

  public put(data){
    let url = this.url_base + "tipoProducto"
    return this.http.put(url,data)
  }

  public delete(id){
    let url = this.url_base + "tipoProducto/" + id
    return this.http.delete(url)
  }
}
