




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
        this.url = 'http://localhost:5007/nchs/';
    }

    /**
     * Se consulta el listad de nichos guardados
     */
    generaCarpetasNicho(id: string, nombre: string, general: any): Observable<any>{
        return this._http.post(`${this.url}configuracion/generar/carpetas/${nombre}/${id}`, general);
    }

    /**
     * Se guarda la fuente adjuntada
     */
    guardarFuente(id:string, fuente: any): Observable<any>{
        return this._http.post(`${this.url}configuracion/actualizar/fuente/${id}`, {fuente});
    }

    /**
     * Se suben archivos principales del proyecto
     */
    subirArchivos(id:string, nombre: string): Observable<any>{
        return this._http.get(`${this.url}configuracion/subir/files/${id}/${nombre}`);
    }

    /**
     * 
     * @param Se guarda los datos del logo en BD
     * @param logo 
     * @returns 
     */
    guardarLogo(id: string, logo: any): Observable<any>{
        return this._http.post(`${this.url}configuracion/guardar/logo/${id}`, {logo});
    }

     /**
     * 
     * @param Se guarda los datos del logo en BD
     * @param logo 
     * @returns 
     */
     guardarIcon(id: string, icon: any): Observable<any>{
        return this._http.post(`${this.url}configuracion/guardar/icon/${id}`, {icon});
     }

     /**
      * Se actualizan los datos del nicho
      */
     actualizarDatosNicho(id: string, nicho: any): Observable<any>{
        return this._http.post(`${this.url}configuracion/actualizar/general/${id}`, nicho);
     }

}