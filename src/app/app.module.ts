import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AltaNichoComponent } from './proyectos/alta-nicho/alta-nicho.component';
import {MatInputModule} from '@angular/material/input';
import { ConfiguracionNichoComponent } from './configuracion-nicho/configuracion-nicho.component';
import { ConfigBdComponent } from './configuracion-nicho/config-bd/config-bd.component';
import { ConfigGeneralComponent } from './configuracion-nicho/config-general/config-general.component';
import { ConfigBlogComponent } from './configuracion-nicho/config-blog/config-blog.component';
import { ConfigFtpComponent } from './configuracion-nicho/config-ftp/config-ftp.component';
import { MatButtonModule } from '@angular/material/button';
import { NgxColorsModule } from 'ngx-colors';
import { FileUploadModule } from 'ng2-file-upload';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NotasComponent } from './configuracion-nicho/config-blog/notas/notas.component';
import { AltaNotaComponent } from './configuracion-nicho/config-blog/alta-nota/alta-nota.component';
import { UploderComponent } from './templates/uploder/uploder.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CKEditorModule } from 'ckeditor4-angular';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    ProyectosComponent,
    AltaNichoComponent,
    ConfiguracionNichoComponent,
    ConfigBdComponent,
    ConfigGeneralComponent,
    ConfigBlogComponent,
    ConfigFtpComponent,
    NotasComponent,
    AltaNotaComponent,
    UploderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    NgxColorsModule,
    FileUploadModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    DragDropModule,
    CKEditorModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
