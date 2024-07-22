import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { cleanText } from 'src/app/lib/helpers';
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

     let nicho = {
        nombre: cleanText(this.nicho.nombre)
     }

     this.nichosService.guardarConfiguracionBD(this.nicho.database, this.nicho._id, nicho)
        .subscribe(response=>{
          this.nicho.database._id = response._id;
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
   * Se crea la estructura en BD en mysql necesaria para el nicho
   */
  crearEstructuraBD(){
    if(this.nicho.database.estructura){
       return;
    }
    this.nichosService.creaEstructuraBD(this.nicho.database._id)
        .subscribe(response=>{
          this.nicho.database = response;
          console.log('Se creo la estructura: ', response);
        })
  }

  /**
   * Se sale de la pantalla para la configuracion en BD
   */
  cancelar(){
    this.salir.emit(false);
  }

}
