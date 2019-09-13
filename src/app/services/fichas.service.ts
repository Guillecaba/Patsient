import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FichaService {
  private url_base = "https://gy7228.myfoscam.org:8443/stock-pwfe/";
  //URL ='https://gy7228.myfoscam.org:8443/stock-pwfe/persona';
 
  constructor(public  http: HttpClient) { 
    

   }
   public all(){
    let url = this.url_base + 'fichaClinica'
    return this.http.get(url)
  }

  public get(filters){
    let separator = '?'
    let url = this.url_base + 'fichaClinica'
    for(let k in filters){
      if(filters[k] == null) {
        continue
      }
      url= url + separator + k + "=" +filters[k]
      separator = "&"
    }
    return this.http.get(url)
  }

  

  public post(data){
    const body = JSON.stringify(data);
    let url = this.url_base + 'fichaClinica'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
     
    });

    return this.http.post(url,data, { headers })
  }

  public put(data){
    const body = JSON.stringify(data);
    let url = this.url_base + 'fichaClinica/'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
     
    });

    return this.http.put(url,data,{ headers })
  }

  public delete(id){
    let url = this.url_base + "fichaClinica/" + id
    return this.http.delete(url)
  }

  }