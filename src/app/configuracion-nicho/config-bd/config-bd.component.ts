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
    this.nichosService.creaEstructuraBD(this.nicho.database._id, cleanText(this.nicho.nombre))
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

  /**
   * Se suben datos de la bd al proyecto del ambiente de pruebas
   */
  subirModificacionesDEV(){
      console.log('Se suben cambios al ambiente de pruebas');
      let comandos: Array<any> = [];
      comandos.push(`cp server/nichos/${cleanText(this.nicho.nombre)}/assets/json/conexion.json /Applications/XAMPP/htdocs/${cleanText(this.nicho.nombre)}/assets/json/conexion.json`);

      let campo = {
        _id: this.nicho.database._id,
        $set: {
          'ambiente.dev': true
        }
      }

      let data = {
        commands: comandos,
        campo: campo
      }

      this.nichosService.subirModificacionesDEV(data)
          .subscribe(response=>{
            this.nicho.database = response.bd;
          });
  }

}
