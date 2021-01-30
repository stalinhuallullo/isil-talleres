import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContenedorComponent } from './layouts/web/contenedor/contenedor.component';

const routes: Routes = [
  {
    path: '',
    component: ContenedorComponent,
    loadChildren: () => import('./modulos/modulos.module').then(m => m.ModulosModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
