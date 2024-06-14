import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { AltaNichoComponent } from './proyectos/alta-nicho/alta-nicho.component';
import { ConfiguracionNichoComponent } from './configuracion-nicho/configuracion-nicho.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
