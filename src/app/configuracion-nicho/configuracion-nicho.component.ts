import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NichosService } from '../services/nichos.service';

@Component({
  selector: 'app-configuracion-nicho',
  templateUrl: './configuracion-nicho.component.html',
  styleUrls: ['./configuracion-nicho.component.scss'],
  providers: [NichosService]
})
export class ConfiguracionNichoComponent implements OnInit{

   public idConfiguracion: number = 0;
   public idNicho: string = '';
   public nicho: any;
   public loading: boolean = true;

   constructor(private activatedRoute: ActivatedRoute,
               private nichosService: NichosService){

   }
   
  ngOnInit(): void {
    this.idNicho = this.activatedRoute.snapshot.params['idNicho'];
    this.consultaDataNicho();
  }

  /**
   * Se consulta la data del nicho
   */
   consultaDataNicho(){
     this.loading = true;
     this.nichosService.consultaNichoById(this.idNicho)
         .subscribe(response=>{
          this.nicho = response.nicho;
          this.nicho.database = response.database;
          this.nicho.general = response.general;
          this.loading = false;
         });
   }

   //PENDIENTES
   //Agergar validacion en general que no se puede cargar fuente o logos hasta que hayas generado la estructura del proyecto
   //analizar bien y no habilitar la siguiente opcion sin que este bien la anterior de botones y procesos
   //me falta hacer todo lo de la base de datos, crear toda la estructura
   //hacer bien mi servidor y consultar la imagen que adjunte
   //El color por defaul me sale en blanco, ponerlos de otro color para saber
   //validacion que no se duplique el nombre del nicho
   //Las imagenes ponerlas con el dominio, ahorita las estoy llamando directo a la carpeta
   //creo que las redes sociales no lo deje bien
   //uploader validacion que solo permita una umagen o reemplazarla, opción para eliminar la opción que se agrego de drag and drop
   //Validacion para no pones 2 table content.
   //meter fechas de creacion mas que nada en notas y categorias para saber
   //ya lo pnese y cuando sea produ, poner el dominio donde ya agregue el campo y cuando sea pruebas sera el nombre de la carpeta como lo toma xampp, yo ponerlo con la funcion que creee
   //lo de las imagenes como voy a dejar las 3 opciones
   //Agregar validación que hasta wue llenes todo se pueda guardar, esto porque ahi genero rutas y necesito que los datos esten completos
   //al proyecto le falta compiar el htaccsess
   //Hacer un panorama general, al momento de subir una noticia o en algun lugar para ahi ver que le falta por subir o ocmo esta el seo entre otras cosas. bien
   //En categorias solo permitir una home, si se pone otra decir que no se puede o algo asi

   //QUE SIGUE
   //Generar ya todos los archivos y jsons
   //Subir datos al FTP
   //crear todo en data de mysql
   //comentarios
   //Notaas, crear pero no publicar
   //versiones se archivo si ya subi a producción
   //Enlazado de noticias, manual ya con el tiempo programarlo a automatico


} 
