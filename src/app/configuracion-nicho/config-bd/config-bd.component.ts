import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NichosService } from 'src/app/services/nichos.service';

@Component({
  selector: 'app-config-bd',
  templateUrl: './config-bd.component.html',
  styleUrls: ['./config-bd.component.scss'],
  providers: [NichosService]
})
export class ConfigBdComponent implements OnInit{
  
  @Input() nicho: any = {};
  @Output() salir = new EventEmitter<any>();

  constructor(private nichosService: NichosService){

  }

  ngOnInit(): void {
    if(!this.nicho.database){
       this.nicho.database = {};
    }
  }

  /**
   * Se guarda la configuracion de BD
   */
  guardarConfiguracionBD(){
     if(!this.nicho.database.host || !this.nicho.database.usuario || 
        !this.nicho.database.password || !this.nicho.database.database){
        alert('Faltan campos por llenar');
        return;
     }

     this.nichosService.guardarConfiguracionBD(this.nicho.database, this.nicho._id)
        .subscribe(response=>{
          this.nicho.database_id = response._id;
        });
  }

  /**
   * Se hace un test para ver si llegamos a la conexion en BD
   */
  testBD(){
    if(!this.nicho.database._id){ 
       alert('No has configurado la conexion');
       return; 
    }
    this.nichosService.testBD(this.nicho.database)
        .subscribe(response=>{
          this.nicho.database.conexion = response.conn;
        });
  }

  /**
   * Se sale de la pantalla para la configuracion en BD
   */
  cancelar(){
    this.salir.emit(false);
  }

}
