import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoticiasComponent} from './components/paginas/noticias/noticias.component';
import {NoticiasDetalleComponent} from './components/paginas/noticias-detalle/noticias-detalle.component';

const routes: Routes = [
  { path: '', component: NoticiasComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'noticias/:id', component: NoticiasDetalleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadesRoutingModule { }
