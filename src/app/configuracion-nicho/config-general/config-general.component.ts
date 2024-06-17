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
          this.nicho.general = {
            dominio: null,
            carpetas: false,
            background: '#000000',
            filesProyecto: false,
            logo: null,
            icon: null,
          };
      }
    }

    /**
     * Se generan las carpetas del proyecto
     */
    generarCarpetasNicho(){
       this.configuracionService.generaCarpetasNicho(this.nicho._id, this.cleanNameVideo(this.nicho.nombre), this.nicho.general)
           .subscribe(response=>{
              this.nicho.general.carpetas = true;
              this.nicho.general._id = response._id;
           });
    }

    cleanNameVideo(cadena: any) {
      var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,";
      // Definimos los caracteres que queremos eliminar
      var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,";
  
      for (var j = 0; j < specialChars.length; j++) {
          cadena = cadena.replace(new RegExp("\\" + specialChars[j], 'gi'), '');
      }
  
      cadena = cadena.replace(/ /g, "_");
  
      cadena = cadena.replace(/á/gi, "a");
      cadena = cadena.replace(/é/gi, "e");
      cadena = cadena.replace(/í/gi, "i");
      cadena = cadena.replace(/ó/gi, "o");
      cadena = cadena.replace(/ú/gi, "u");
      cadena = cadena.replace(/ñ/gi, "n");
  
      cadena = cadena.replace(/Á/gi, "A");
      cadena = cadena.replace(/É/gi, "E");
      cadena = cadena.replace(/Í/gi, "I");
      cadena = cadena.replace(/Ó/gi, "O");
      cadena = cadena.replace(/Ú/gi, "U");
      cadena = cadena.replace(/Ñ/gi, "N");
      cadena = cadena.replace(/'/gi, "");
  
      cadena = cadena.replace(/́/g, "");
      cadena = cadena.replace(/̃/g, "");
  
      // JAVV: Reemplazamos repeticiones de _ por uno solo
      cadena = cadena.replace(/_+/g, '_');
      return cadena.toLowerCase();
  }
}
