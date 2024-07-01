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
} 
