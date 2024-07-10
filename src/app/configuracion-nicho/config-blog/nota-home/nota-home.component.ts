import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cleanText } from 'src/app/lib/helpers';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-nota-home',
  templateUrl: './nota-home.component.html',
  styleUrls: ['./nota-home.component.scss'],
  providers: [BlogService]
})
export class NotaHomeComponent implements OnInit{
  
  public noticia: any = {};
  public idCategoria: string = '';
  public nicho: any;
  public buscador: any = {};

  constructor(private blogService: BlogService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ){
  }

  ngOnInit(): void {
    this.idCategoria = this.activatedRoute.snapshot.params['idCategoria'];
    this.buscador.noticias_style1 = {};
    this.buscador.noticias_style1.pagination = {};
    this.consultaConfiguracionHome();
  }

  /**
   * Se consulta la configuración del home
   */
  consultaConfiguracionHome(){
     this.blogService.getHome(this.idCategoria)
         .subscribe(response=>{
           this.noticia = response.home || {};
           this.buscador = response.busqueda || {};
           this.nicho = response;
         });
  }

  /**
   * Se guarda la configuracion de la pagina home
   */
  guardarConfiguracion(){
     if(this.noticia.paginador){
        this.noticia.noticias_style1.mascara = `${this.noticia.noticias_style1.prefijo}/pagina/{idPagina}`;
        this.noticia.noticias_style1.pagination = {
          name: "pagina",
          mask: `${this.noticia.noticias_style1.prefijo}/pagina/#`,
          prefix : `${this.noticia.noticias_style1.prefijo}/pagina/`,
          dominio: this.noticia.noticias_style1.dominio,
          paginasMostrar: 6
        };
     }

     let nicho = {
        nombre: cleanText(this.nicho.nombre)
     }

     this.noticia.categoria = this.idCategoria;
     this.blogService.guardarHome(this.noticia, nicho)
         .subscribe(response=>{
           this.regresar();
         })
  }

  setDatosPaginador(event: any){
    if(event.checked){
       this.noticia.noticias_style1 = {}
    }else{
       delete this.noticia.noticias_style1;
    }
  }

  guardarBusqueda(){
    this.buscador.noticias_style1.mascara = `${this.buscador.noticias_style1.prefijo}/pagina/{idPagina}`;
    this.buscador.noticias_style1.pagination = {
      name: "pagina",
      mask: `${this.buscador.noticias_style1.prefijo}/pagina/#`,
      prefix : `${this.buscador.noticias_style1.prefijo}/pagina/`,
      dominio: this.buscador.noticias_style1.dominio,
      paginasMostrar: 6
    };

    let nicho = {
      nombre: cleanText(this.nicho.nombre)
   }

    this.blogService.guardarBusqueda(this.buscador, nicho)
        .subscribe(response=>{
          this.regresar();
        });
  }

  regresar(){
    this.router.navigate([`/nicho/configuracion/${this.nicho._id}`]);
  }

  

}
