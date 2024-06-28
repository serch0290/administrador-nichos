import { Component, EventEmitter, Input,  OnInit,  Output } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { NichosService } from 'src/app/services/nichos.service';

@Component({
  selector: 'app-config-blog',
  templateUrl: './config-blog.component.html',
  styleUrls: ['./config-blog.component.scss']
})
export class ConfigBlogComponent implements OnInit{

  public categoria: any = {idSQL: 0};
  @Input() nicho: any = {};
  @Output() salir = new EventEmitter<any>();
  public listadoCategorias: Array<any> = [];

  constructor(private nichosService: NichosService,
              private blogService: BlogService,
              private router: Router){
  }


  ngOnInit(): void {
    this.consultaListadoCategorias();
  }

  /**
   * Se guarda la categoria
   */
  guardarCategoria(){
     this.categoria.nicho = this.nicho._id;
     this.blogService.guardarCategoria(this.nicho._id, this.categoria)
         .subscribe(response=>{
           this.consultaListadoCategorias();
           this.categoria = { idSQL: 0 };
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

  /**
   * 
   * @param idCategoria Se va al listado de noticias
   */
  irListadoNoticias(categoria: any){
    this.router.navigate([`nicho/categoria/${categoria._id}/notas`]);
  }

}
