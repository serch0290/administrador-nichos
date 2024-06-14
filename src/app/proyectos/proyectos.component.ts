import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NichosService } from '../services/nichos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
  providers: [NichosService]
})
export class ProyectosComponent {

  public listadoNichos: Array<any> = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private nichosService: NichosService){
      this.consultaListadoNichos();
  }

    /**
    * Se va a pantalla para dar de alta un nuevo nicho
    */
    irAlta(){ 
       this.router.navigate(['/nicho/alta']);
    }

    /**
    * Se muestra pantalla de configuracion del nicho
    */
    configurarNicho(idNicho: number){
      this.router.navigate([`/nicho/configuracion/${idNicho}`]);
    }

    consultaListadoNichos(){
        this.nichosService.consultaListadoNichos()
            .subscribe(response=>{
              this.listadoNichos = response;
            })
    }
}
