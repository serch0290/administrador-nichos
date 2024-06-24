import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
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
    uploader: FileUploader = new FileUploader({url: 'http://localhost:5007/nchs/upload/file'});
    
    
    constructor(private configuracionService: ConfiguracionService){}

    ngOnInit(): void {
      if(!this.nicho.general){
          this.nicho.general = {
            dominio: null,
            carpetas: false,
            background: '#000000',
            fuentes: [],
            filesProyecto: false,
            logo: null,
            icon: null,
          };
      }

      this.cargarUploader();
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

  cargarUploader(){
    this.uploader = new FileUploader(
			{
				url: 'http://localhost:5007/nchs/upload/file',
        headers: [
          { name: "path", value: `${this.cleanNameVideo(this.nicho.nombre)}/assets` }
        ]
			}
		);
    this.uploader.queue = [];

    
    /**
     * Función para modificar el alias del archivo una vez que se ha subido
     */
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
       let data = JSON.parse(response);
       switch(data.tipo){
         case '1':
          this.guardarFuente(data);
          break;
         case '2':
           this.guardarLogo(data.url, data.cms);
          break;
         case '3':
           this.guardarIcon(data.url, data.cms);
          break;
       }
    }

    this.uploader.onBeforeUploadItem = (fileItem: FileItem) => {
      fileItem.withCredentials = false;
    }

    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      alert('Ocurrió un error al cargar imagen');
    }
    // Función para modificar el nombre del archivo el momento que se agregue al uploader (Sólo en BD)
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      fileItem.withCredentials = false;
      switch(fileItem.options.headers[1].value){
        case '2':
          fileItem.file.name = 'logo.' +  this.obtenerExtension(fileItem);
          break;
        case '3':
          fileItem.file.name = 'icon.' +  this.obtenerExtension(fileItem);
          break;
      }
      fileItem.upload();

    }
  }

  /**
   * Se obtiene la extensión del archivo
   */
  obtenerExtension(fileItem: any){
     let ext = fileItem.file.name.split('.');
     return ext[ext.length - 1];
  }

  /**
   * Se guarda fuente en BD
   */
  guardarFuente(data: any){
    let fuente = {
      file: data.filename,
      name: data.filename.split('.')[0]
    }
    this.configuracionService.guardarFuente(this.nicho.general._id, fuente)
    .subscribe(response=>{
        this.nicho.general.fuentes = response.fuentes;
    });
  }

  /**
   * Se guarda el logo en BD
   */
  guardarLogo(urlFile: string, urlCMS: string){
    let logo = {
      file: urlFile, 
      fileCMS: urlCMS
    }
     this.configuracionService.guardarLogo(this.nicho.general._id, logo)
        .subscribe(response=>{
           this.nicho.general.logo = response.logo;
        })
  }

  /**
   * Se guarda el icon que va a tener el nicho
   */
  guardarIcon(urlFile: string, urlCMS: string){
    let icon = {
      file: urlFile, 
      fileCMS: urlCMS
    }
     this.configuracionService.guardarIcon(this.nicho.general._id, icon)
        .subscribe(response=>{
           this.nicho.general.icon = response.icon;
        })
  }


  /**
  * Función para mostrar el explorador de archivos
  */
  addFiles(tipo: string) {
   let doc =  document.getElementById('add-file-button' + tipo);
   if(doc){ doc.click(); }
   this.uploader.setOptions({ url: 'http://localhost:5007/nchs/upload/file',
                              headers: [
                                { name: "path", value: `${this.cleanNameVideo(this.nicho.nombre)}/assets` },
                                { name: "tipo", value: tipo },
                                { name: "id", value: this.nicho._id}
                              ]
                            });
  }

  /**
  * Función para subir los archivos principales del proyecto
  */
  subirArchivos(){
     this.configuracionService.subirArchivos(this.nicho.general._id, this.cleanNameVideo(this.nicho.nombre))
         .subscribe(response=>{
           if(response.status){
              this.nicho.general.filesProyecto = true;
              this.generarCarpetasNicho();
           }   
         });
  }
}
