import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './catalogo/components/paginas/inicio/inicio.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'catalogo', loadChildren: () => import('./catalogo/catalogo.module').then(m => m.CatalogoModule) },
  { path: 'pasarela', loadChildren: () => import('./pasarela/pasarela.module').then(m => m.PasarelaModule) },
  { path: 'actividades', loadChildren: () => import('./actividades/actividades.module').then(m => m.ActividadesModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulosRoutingModule { }
