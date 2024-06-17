import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-config-general',
  templateUrl: './config-general.component.html',
  styleUrls: ['./config-general.component.scss'],
  providers:[ConfiguracionService]
})
export class ConfigGeneralComponent implements OnInit{
    
    @Input() nicho: any = {};
    @Output() salir = new EventEmitter<any>();
    
    constructor(private configuracionService: ConfiguracionService){}

    ngOnInit(): void {
      if(!this.nicho.general){
          this.nicho.general = {};
      }
    }

    /**
     * Se generan las carpetas del proyecto
     */
    generarCarpetasNicho(){
       this.configuracionService.generaCarpetasNicho()
           .subscribe(response=>{
              console.log('Carpetas generadas: ', response);
           });
    }

}
