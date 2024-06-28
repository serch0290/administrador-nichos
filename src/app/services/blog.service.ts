import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class BlogService
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
    guardarCategoria(id: string, categoria: any): Observable<any>{
        return this._http.post(`${this.url}blog/guardar/categoria/${id}`, categoria);
    }

    /**
     * Se consuta el listado de categorias
     */
    consultaListadoCategorias(id: string): Observable<any>{
        return this._http.get(`${this.url}blog/listado/categorias/${id}`);
    }

     /**
     * Se consuta el listado de noticias
     */
    consultaListadoNoticias(idCategoria: string): Observable<any>{
        return this._http.get(`${this.url}blog/listado/noticias/${idCategoria}`);
    }

    /**
     * 
     * @param idCategoria Se consultan los datos del nicho
     * @returns 
     */
    consultaDatosNicho(idCategoria: string): Observable<any>{
        return this._http.get(`${this.url}blog/consuta/datos/nicho/${idCategoria}`);
    }

}