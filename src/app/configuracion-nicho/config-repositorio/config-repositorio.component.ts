import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { cleanText } from 'src/app/lib/helpers';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-config-repositorio',
  templateUrl: './config-repositorio.component.html',
  styleUrls: ['./config-repositorio.component.scss'],
  providers: [FilesService]
})
export class ConfigRepositorioComponent implements OnInit{
   
    public repositorio: any = {};
    @Input() nicho: any;
    public listadoRepositorio: Array<any> = [];
    @Output() salir = new EventEmitter<any>();

    constructor(private filesService: FilesService){
      
    }

    ngOnInit(): void {
      this.consultaListadoRepositorio();
    }

    /**
     * Se consulta el listado de repositorios que hay guardados
     */
    consultaListadoRepositorio(){
      this.filesService.getListadoFiles()
          .subscribe(response=>{
            this.listadoRepositorio = response;
          })
    }

    /**
     * Se guarda el file
     */
    guardarFile(){
      this.repositorio.tipo = 0;
      this.filesService.saveFile(this.repositorio)
          .subscribe(response=>{
            this.consultaListadoRepositorio();
            this.repositorio = {};
          });
    }

    /**
     * Si hacemos una modificacion en el repositorio central tomamos el archivos y lo subimos al repo que tenemos ne nodejs
     */
    subirFileAlRepoPruebas(file: any){
      let comando = `cp /Applications/XAMPP/htdocs/serflix${file.path}${file.file} server/nichos/repositorio${file.path}`;
      let campo = {
        _id: file._id,
        $set: {
          'repo': true,
          'local': false,
          'dev': false,
          'prod': false
        }
      }

      this.filesService.subirFile(comando, campo)
          .subscribe(response=>{
            file.repo = response.repo;
            file.local = response.local;
            file.dev = response.dev;
            file.prod = response.prod;
          })
    }

    /**
     * Se sube file a pruebas
     */
    subirFileLocal(file: any){
      let comando = `cp server/nichos/repositorio${file.path}${file.file} server/nichos/${cleanText(this.nicho.nombre)}${file.path}`;
      let campo = {
        _id: file._id,
        $set: {
          'local': true
        }
      }

      this.filesService.subirFile(comando, campo)
          .subscribe(response=>{
            file.local = response.local;
          })
    }

    /**
     * Se sube el archivo a dev
     */
    subirFileDev(file: any){
      let comando = `cp server/nichos/${cleanText(this.nicho.nombre)}${file.path}${file.file} /Applications/XAMPP/htdocs/${cleanText(this.nicho.nombre)}${file.path}`;
      let campo = {
        _id: file._id,
        $set: {
          'dev': true
        }
      }

      this.filesService.subirFile(comando, campo)
          .subscribe(response=>{
            file.dev = response.dev;
          })
    }
    

}
