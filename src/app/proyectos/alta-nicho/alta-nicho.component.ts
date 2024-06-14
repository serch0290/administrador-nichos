import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NichosService } from 'src/app/services/nichos.service';


@Component({
  selector: 'app-alta-nicho',
  templateUrl: './alta-nicho.component.html',
  styleUrls: ['./alta-nicho.component.scss'],
  providers: [NichosService]
})
export class AltaNichoComponent {

  public nombre: string = '';
  public descripcion : string = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private nichosService: NichosService){
  }

  cancelar(){
    this.router.navigate(['/nichos']);
  }

  /**
   * Se guarda el nicho 
   */
  guardarNicho(){

    if(this.nombre == '' || this.descripcion == '') return;

    this.nichosService.guardarNicho(this.nombre, this.descripcion)
        .subscribe(response=>{
           this.cancelar();
        })
  }

}
