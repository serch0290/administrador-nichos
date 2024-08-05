import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-config-repositorio',
  templateUrl: './config-repositorio.component.html',
  styleUrls: ['./config-repositorio.component.scss'],
  providers: [FilesService]
})
export class ConfigRepositorioComponent implements OnInit{
   
    public repositorio: any = {};
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
    

}
