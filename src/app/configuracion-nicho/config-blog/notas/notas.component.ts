import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit{

    public idCategoria: string = '';
    public listadoNoticias: Array<any> = [];
    public detalle: boolean = false;
    public noticia: any;
    public nicho: any = {};
    public categoria: any = {};

    constructor(private activatedRoute: ActivatedRoute,
                private blogService: BlogService,
                private router: Router){}

    ngOnInit(): void {
      this.idCategoria = this.activatedRoute.snapshot.params['idCategoria'];
      this.consultaListadoNoticias();
      this.consultaDatosNicho();
    }

    /**
     * Se consultan los datos del nicho
     */
    consultaDatosNicho(){
      this.blogService.consultaDatosNicho(this.idCategoria)
          .subscribe(response=>{
            this.nicho = response.nicho;
            this.categoria = response.categoria;
          })
    }

    /**
     * Se consulta el listado de noticias
     */
    consultaListadoNoticias(){
       this.blogService.consultaListadoNoticias(this.idCategoria)
           .subscribe(response=>{
              this.listadoNoticias = response;
           });
    }

    /**
     * Se da de alta la noticia
     */
    irAlta(idNoticia: string){
       if(idNoticia == '0')
          this.router.navigate([`/nicho/categoria/${this.idCategoria}/notas/alta`]);
        else 
          this.router.navigate([`/nicho/categoria/${this.idCategoria}/notas/alta/${idNoticia}`]);
    }

    regresar(){
      this.router.navigate([`/nicho/configuracion/${this.nicho._id}`]);
    }

    /**
     * Se muestra el detalle de la noticia
     */
    verNoticia(noticia: any){
       this.noticia = noticia;
       this.detalle = true;
    }



}
