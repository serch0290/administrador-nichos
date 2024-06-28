import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-nota',
  templateUrl: './alta-nota.component.html',
  styleUrls: ['./alta-nota.component.scss']
})
export class AltaNotaComponent implements OnInit{

  public noticia: any = {};
  constructor(){}

  ngOnInit(): void {
      this.nuevaNoticia();
  }

  /**
   * Se settean valores si es nueva noticia
   */
  nuevaNoticia(){
    this.noticia.author = {};
    this.noticia.noticiasLateral = {
        title: "Lo mas reciente"
    }
    this.noticia.detalle = [];
    this.noticia.idNoticia = 0;
  }


  guardarNoticia(){

  }




}
