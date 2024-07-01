import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileItem, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-uploder',
  templateUrl: './uploder.component.html',
  styleUrls: ['./uploder.component.scss']
})
export class UploderComponent implements OnInit{

    public uploader: FileUploader = new FileUploader({url: 'http://localhost:5007/nchs/upload/file'});
    @Input() configuracion: any;
    @Output() onSuccess = new EventEmitter<any>();
    @Output() onBefore = new EventEmitter<any>();
    @Output() onAfter = new EventEmitter<any>();
    @Output() onError = new EventEmitter<any>();

    constructor(){}

    ngOnInit(): void {
      this.initUpader();
    }

     /**
      * Función para mostrar el explorador de archivos
      */
    addFiles() {
      let doc =  document.getElementById('add-file-button' + this.configuracion.uuid);
      if(doc){ doc.click(); }
    }

    /**
     * Se inicializa el uploader
     */
    initUpader(){
        this.uploader = new FileUploader(
          {
            url: 'http://localhost:5007/nchs/upload/file',
            headers: [
              { name: "path", value: this.configuracion.path },
              { name: "tipo", value: this.configuracion.tipo },
              { name: "id", value: this.configuracion.id },
              { name: "name", value: this.configuracion.name }
            ]
          }
        );
        this.uploader.queue = [];
        

        /**
         * Función para modificar el alias del archivo una vez que se ha subido
         */
        this.uploader.onSuccessItem = (item: FileItem, response: string) => {
          let button = document.getElementById('add-file-button' + this.configuracion.uuid);
          if(button){
             button.setAttribute('value', '');
          }
          
          let data = JSON.parse(response);
          this.configuracion.files = this.uploader.queue;
          this.onSuccess.emit({item, data});
        }

        this.uploader.onBeforeUploadItem = (fileItem: FileItem) => {
          fileItem.withCredentials = false;
          this.onBefore.emit(fileItem);
        }

        this.uploader.onErrorItem = (item: FileItem, response: string) => {
          let data = JSON.parse(response);
          alert('Ocurrió un error al cargar imagen');
          this.onError.emit({item, data});
        }
        // Función para modificar el nombre del archivo el momento que se agregue al uploader (Sólo en BD)
        this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
          fileItem.withCredentials = false;
          this.onAfter.emit(fileItem);
          //fileItem.upload();
        }
  }//Fin del metodo init

    
}
