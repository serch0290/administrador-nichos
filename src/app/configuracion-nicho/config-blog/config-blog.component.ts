import { Component, EventEmitter, Input,  OnInit,  Output } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { NichosService } from 'src/app/services/nichos.service';
import { cleanText } from 'src/app/lib/helpers';

@Component({
  selector: 'app-config-blog',
  templateUrl: './config-blog.component.html',
  styleUrls: ['./config-blog.component.scss'],
  providers:[ConfiguracionService, BlogService]
})
export class ConfigBlogComponent implements OnInit{

  public categoria: any = {idSQL: 0, noticiasLateral: {title: 'Lo más reciente'}, intereses:{title: 'Tambien te puede interesar'}};
  @Input() nicho: any = {};
  @Output() salir = new EventEmitter<any>();
  public listadoCategorias: Array<any> = [];

  constructor(private nichosService: NichosService,
              private blogService: BlogService,
              private configuracionService: ConfiguracionService,
              private router: Router){
  }


  ngOnInit(): void {
    this.consultaListadoCategorias();
  }

  /**
   * Se guarda la categoria
   */
  guardarCategoria(){
     this.setBreadCrumbs();
     this.categoria.nicho = this.nicho._id;
     let nicho = {
       nombre: cleanText(this.nicho.nombre)
    }
     this.blogService.guardarCategoria(this.nicho._id, this.categoria, nicho)
         .subscribe(response=>{
           this.consultaListadoCategorias();
           this.generarRouting();
           this.categoria = { idSQL: 0 };
         });
  }

  /**
   * Se genera el routing de la pagina de acuerdo a las rutas que haya dispinibles
   */
  generarRouting(){
    let data = {
      dominio: this.nicho.general.dominio,
      proyecto: cleanText(this.nicho.nombre)
    }
    this.configuracionService.generarRutas(this.nicho._id, data)
        .subscribe(response=>{
           console.log('response: ', response);
        });
  }

  /**
   * Se consulta el listado de categorias
   */
  consultaListadoCategorias(){
    this.blogService.consultaListadoCategorias(this.nicho._id)
        .subscribe(response=>{
          this.listadoCategorias = response;
        })
  }

  /**Se ponen los breadcrumbs */
  setBreadCrumbs(){
    this.categoria.breadcrumb = [];
    this.categoria.breadcrumb.push({name: 'Inicio', link: '/' + this.nicho.general.dominio});
    this.categoria.breadcrumb.push({name: this.categoria.nombre});
  }



  /**
   * 
   * @param idCategoria Se va al listado de noticias
   */
  irListadoNoticias(categoria: any){
    this.router.navigate([`nicho/categoria/${categoria._id}/notas`]);
  }

}
