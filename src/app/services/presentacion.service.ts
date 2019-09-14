import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService {
  private url_base = "https://gy7228.myfoscam.org:8443/stock-pwfe/";

  constructor(private http:HttpClient) { }

  public all(){
    let url = this.url_base + "presentacionProducto"
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

  public getSubCat(like,cat){
    let url = this.url_base + "tipoProducto?inicio=0&cantidad=5";
    if(like.length > 0){
      url = url + "&like=S"
      url = url + "&ejemplo=" + encodeURIComponent(JSON.stringify({
        descripcion:like,
        idCategoria:{
          idCategoria:cat
        }
      }))
    }else{
      url = url + "&ejemplo=" + encodeURIComponent(JSON.stringify({
        idCategoria:{
          idCategoria:cat
        }
      }))
    }
    return this.http.get(url)
  }

  public getProducto(idTP){
    let url = this.url_base + "producto?ejemplo="  
    url = url + encodeURIComponent(JSON.stringify({
      idTipoProducto:{
        idTipoProducto : idTP
      }
    }))
    return this.http.get(url)
  }

  public get(filters){
    let separator = '?'
    let url = this.url_base + "presentacionProducto"
    for(let k in filters){
      if(filters[k] == null)continue
      url= url + separator + k + "=" +filters[k]
      separator = "&"
    }
    return this.http.get(url)
  }

  public post(data){
    let url = this.url_base + "presentacionProducto"
    return this.http.post(url,data)
  }

  public put(data){
    let url = this.url_base + "presentacionProducto"
    return this.http.put(url,data)
  }

  public delete(id){
    let url = this.url_base + "presentacionProducto/" + id
    return this.http.delete(url)
  }
}
