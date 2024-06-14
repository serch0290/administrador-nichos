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

   constructor(private activatedRoute: ActivatedRoute,
               private nichosService: NichosService){

   }
  ngOnInit(): void {
    this.idNicho = this.activatedRoute.snapshot.params['idNicho'];
    this.consultaDataNicho();
    console.log('idNicho: ', this.idNicho);

  }

  /**
   * Se consulta la data del nicho
   */
   consultaDataNicho(){
     this.nichosService.consultaNichoById(this.idNicho)
         .subscribe(response=>{
          this.nicho = response;
          console.log('response: ', response);
         })
   }
}
