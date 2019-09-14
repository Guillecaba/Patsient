import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private url_base = "https://gy7228.myfoscam.org:8443/stock-pwfe/";

  constructor(private http:HttpClient) { }

  public all(desde,hasta,empleado,cliente){
    let url = this.url_base + "servicio?"
    let obj:any = {
      fechaDesdeCadena:desde,
      fechaHastaCadena:hasta    
    }
    if(empleado){
      obj['idEmpleado'] = {
        idPersona:empleado
      }
    }
    if(cliente){
      obj['idFichaClinica'] = {
        idCliente:{
          idPersona:cliente
        }
      }
    }
    url = url + 'ejemplo=' + encodeURIComponent(JSON.stringify(obj))
    return this.http.get(url)
  }

  public detalle(id){
    let url = this.url_base + 'servicio/'+ id +'/detalle'

    return this.http.get(url);
  }

  public get_clientes(){
    let url = this.url_base + 'persona?orderBy=apellido&orderDir=asc';
    return this.http.get(url);
  }
  public get_empleados(){
    let url = this.url_base + 'persona?orderBy=apellido&orderDir=asc&ejemplo=%7B"soloUsuariosDelSistema"%3Atrue%7D';
  return this.http.get(url);
  }
}

