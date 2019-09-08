import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url_base = "https://gy7228.myfoscam.org:8443/stock-pwfe/";

  constructor(private http:HttpClient) { }

  public all(){
    let url = this.url_base + "categoria"
    return this.http.get(url)
  }

  public get(filters){
    let separator = '?'
    let url = this.url_base + "categoria"
    for(let k in filters){
      if(filters[k] == null)continue
      url= url + separator + k + "=" +filters[k]
      separator = "&"
    }
    return this.http.get(url)
  }

  public post(data){
    let url = this.url_base + "categoria"
    return this.http.post(url,data)
  }

  public put(data){
    let url = this.url_base + "categoria"
    return this.http.put(url,data)
  }

  public delete(id){
    let url = this.url_base + "categoria/" + id
    return this.http.delete(url)
  }
}
