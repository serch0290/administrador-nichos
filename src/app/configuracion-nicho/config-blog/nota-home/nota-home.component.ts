import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public idNicho: string = '';


  constructor(private blogService: BlogService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ){


  }
  ngOnInit(): void {
    this.idCategoria = this.activatedRoute.snapshot.params['idCategoria'];
    this.idNicho = this.activatedRoute.snapshot.params['idNicho'];
    this.consultaConfiguracionHome();
  }

  /**
   * Se consulta la configuración del home
   */
  consultaConfiguracionHome(){
     this.blogService.getHome(this.idCategoria)
         .subscribe(response=>{
           console.log('configuracio home: ', response);
           this.noticia = response || {};
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

     this.blogService.guardarHome(this.noticia)
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

  regresar(){
    this.router.navigate([`/nicho/configuracion/${this.idNicho}`]);
  }

  

}
