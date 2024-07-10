import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { AltaNichoComponent } from './proyectos/alta-nicho/alta-nicho.component';
import { ConfiguracionNichoComponent } from './configuracion-nicho/configuracion-nicho.component';
import { AltaNotaComponent } from './configuracion-nicho/config-blog/alta-nota/alta-nota.component';
import { NotasComponent } from './configuracion-nicho/config-blog/notas/notas.component';
import { NotaHomeComponent } from './configuracion-nicho/config-blog/nota-home/nota-home.component';

const routes: Routes = [
  {
    path: 'nichos',
    component: ProyectosComponent
  },
  {
    path: 'nicho/alta',
    component: AltaNichoComponent
  },
  {
    path: 'nicho/configuracion/:idNicho',
    component: ConfiguracionNichoComponent
  },
  {
    path: 'nicho/categoria/:idCategoria/notas',
    component: NotasComponent
  },
  {
    path: 'nicho/categoria/:idCategoria/notas/alta',
    component: AltaNotaComponent
  },
  {
    path: 'nicho/categoria/:idCategoria/notas/alta/:idNoticia',
    component: AltaNotaComponent
  },
  {
    path: 'nicho/categoria/:idCategoria/home',
    component: NotaHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
