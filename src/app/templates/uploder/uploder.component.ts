import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-uploder',
  templateUrl: './uploder.component.html',
  styleUrls: ['./uploder.component.scss']
})
export class UploderComponent {

    public uploader: FileUploader = new FileUploader({url: 'http://localhost:5007/nchs/upload/file'});

    constructor(){}

     /**
  * Función para mostrar el explorador de archivos
  */
  addFiles() {
    let doc =  document.getElementById('add-file-button');
    if(doc){ doc.click(); }
  }
}
