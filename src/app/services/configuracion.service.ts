




import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class ConfiguracionService
{

    /** 
     *  Contructor del servicio
     *  @constructor 
     *  @param _http {HttpClient} Servicio para realizar peticiones AJAX
     * 
    */
    public url: string;

    constructor(
        public _http: HttpClient,
    ) {
        this.url = 'http://localhost:6007/arbitraje/';
    }

    /**
     * Se consulta el listad de nichos guardados
     */
    generaCarpetasNicho(): Observable<any>{
        return this._http.get(`${this.url}configuracion/generar/carpetas`);
    }

}