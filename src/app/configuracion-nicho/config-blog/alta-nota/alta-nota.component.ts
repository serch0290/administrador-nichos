import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { v4 as uuidv4 } from 'uuid';
declare var CKEDITOR: any;

@Component({
  selector: 'app-alta-nota',
  templateUrl: './alta-nota.component.html',
  styleUrls: ['./alta-nota.component.scss'],
  providers: [BlogService]
})
export class AltaNotaComponent implements OnInit{

  public noticia: any = {};
  public idCategoria: string = '';
  public nicho: any;
  public categoria: any;
  public opcionesUploaderAuthor: any;
  public tipoSeleccion: string = '';
  public prueba: string = '';
  public idNoticia: string = '';
  public loading: boolean = true;
  
  constructor(private blogService: BlogService,
              private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
      this.idCategoria = this.activatedRoute.snapshot.params['idCategoria'];
      this.idNoticia = this.activatedRoute.snapshot.params['idNoticia'];

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
          if(this.idNoticia){
             this.consultaNoticia();
          }else{
            this.loading = false;
            this.nuevaNoticia();
          }

          this.opcionesUploaderAuthor = {
            path: `${this.cleanNameVideo(this.nicho.nombre)}/assets/images/author`,
            tipo: '4',
            id: this.nicho._id,
            uuid: uuidv4(),
            nameButton: 'Adjuntar Foto Author',
            files: []
          }
        })
  }

  /**
   * Se consulta la noticia que ya esta guardada
   */
  consultaNoticia(){
     this.blogService.consultaNoticiaById(this.idNoticia)
         .subscribe(response=>{
          this.loading = false;
          this.noticia = response;
         })
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


  /**
   * 
   * @param event Se guarda la ruta de la noticia
   */
  guardarNoticia(event: any, tipo: number, detalle: any = {}){
     switch(tipo){
        case 1:
          this.noticia.author.foto = event.data.url;
          break;
        case 2:
          detalle.img = event.data.url;
          console.log('detalle: ', detalle);
          break;
     }
  }

  cleanNameVideo(cadena: any) {
    var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,";
    // Definimos los caracteres que queremos eliminar
    var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,";

    for (var j = 0; j < specialChars.length; j++) {
        cadena = cadena.replace(new RegExp("\\" + specialChars[j], 'gi'), '');
    }

    cadena = cadena.replace(/ /g, "-");

    cadena = cadena.replace(/á/gi, "a");
    cadena = cadena.replace(/é/gi, "e");
    cadena = cadena.replace(/í/gi, "i");
    cadena = cadena.replace(/ó/gi, "o");
    cadena = cadena.replace(/ú/gi, "u");
    cadena = cadena.replace(/ñ/gi, "n");

    cadena = cadena.replace(/Á/gi, "A");
    cadena = cadena.replace(/É/gi, "E");
    cadena = cadena.replace(/Í/gi, "I");
    cadena = cadena.replace(/Ó/gi, "O");
    cadena = cadena.replace(/Ú/gi, "U");
    cadena = cadena.replace(/Ñ/gi, "N");
    cadena = cadena.replace(/'/gi, "");

    cadena = cadena.replace(/́/g, "");
    cadena = cadena.replace(/̃/g, "");

    // JAVV: Reemplazamos repeticiones de _ por uno solo
    cadena = cadena.replace(/_+/g, '_');
    return cadena.toLowerCase();
 }

 /**
  * Se adjunta el archivo
  */
 cargaArchivo(fileItem: any, tipo: number){
    switch(tipo){
      case 1://Imagen author
         fileItem.file.name = 'author.' +  this.obtenerExtension(fileItem);
        break;
      case 2:
         let date = new Date().getTime();
         fileItem.file.name = `noticia_${date}.` +  this.obtenerExtension(fileItem);
        break;
    }
    fileItem.upload();
 }

 /**
  * Se muestra opción que va a tener el sitio web
  */
 mostrarOpcion(event: any){
  switch(this.tipoSeleccion){
    case 'html':
      this.noticia.detalle.push({type: this.tipoSeleccion, html: '', edit: true});
      break;
    case 'h2':
    case 'h3':
      this.noticia.detalle.push({type: this.tipoSeleccion, data: ''});
      break;
    case 'list':
    case 'list-number':
    case 'table-content':
      this.noticia.detalle.push({type: this.tipoSeleccion, list: []});
      break;
    case 'img':
      let uploader = {
        path: `${this.cleanNameVideo(this.nicho.nombre)}/assets/images/noticias`,
        tipo: '4',
        id: this.nicho._id,
        uuid: uuidv4(),
        nameButton: 'Adjuntar Imagen',
        files: []
      }
      this.noticia.detalle.push({type: this.tipoSeleccion, img: '', uploader: uploader});
      break;
    case 'video':
      this.noticia.detalle.push({type: this.tipoSeleccion, video: ''});
      break;
  }
  
 }


 /**
   * Se obtiene la extensión del archivo
   */
 obtenerExtension(fileItem: any){
  let ext = fileItem.file.name.split('.');
  return ext[ext.length - 1];
 }

 drop(event: CdkDragDrop<any[]>) {
  moveItemInArray(this.noticia.detalle, event.previousIndex, event.currentIndex);
 }

  // Maneja el evento 'ready' para inicializar CKEditor en modo inline
  onEditorReady(event: any) {
    const editorElement = document.getElementById('editor1');
    if (editorElement) {
      CKEDITOR.inline(editorElement);
    }
  }

  droplist(event: CdkDragDrop<any[]>, array: Array<any>) {
    moveItemInArray(array, event.previousIndex, event.currentIndex);
  }

  /**
   * Metodo para agregar a la lista
   */
  addList(detalle: any){
    detalle.list.push({name: detalle.name});
    detalle.name = '';
  }

  /**
   * Se llena la tabla de contenidos
   */
  llenarTableContent(){
    let noticia = this.noticia.detalle.find((item: any)=> item.type.includes('table-content'));
    if(noticia){
      noticia.list = [];
      let data = {sublist: [{hash: '', name: ''}], hash: '', name: ''};
       this.noticia.detalle.forEach((item: any) => {
           if(item.type.includes('h2')){
              data = {
                hash: '#' + this.cleanNameVideo(item.data),
                name: item.data,
                sublist: []
              }
              noticia.list.push(data)
           }

           if(item.type.includes('h3')){
              let subdata = {
                hash: '#' + this.cleanNameVideo(item.data),
                name: item.data
              }
              data.sublist.push(subdata);
           }
       });
    }
  }

  guardarH(detalle: any){
    detalle.hash = this.cleanNameVideo(detalle.data)
    this.llenarTableContent();
  }

  /**
   * Se guarda la nota en BD
   */
  finalizarNoticia(){
    this.noticia.url = this.cleanNameVideo(this.noticia.h1);
    let nota = JSON.parse(JSON.stringify(this.noticia));
    nota.detalle.forEach((element: any) => {
      if(element.type.includes('img')) delete element.uploader;
    });
    this.blogService.guardarNoticia(this.idCategoria, nota)
        .subscribe(response=>{
            console.log('noticia: ', response);
        });
  }

}
