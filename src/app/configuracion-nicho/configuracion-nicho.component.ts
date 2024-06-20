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
}
