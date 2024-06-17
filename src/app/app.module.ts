import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    ProyectosComponent,
    AltaNichoComponent,
    ConfiguracionNichoComponent,
    ConfigBdComponent,
    ConfigGeneralComponent,
    ConfigBlogComponent,
    ConfigFtpComponent
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
    NgxColorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
