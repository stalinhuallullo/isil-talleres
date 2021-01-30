import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursosComponent } from './components/paginas/cursos/cursos.component';
import { CursosDetalleComponent } from './components/paginas/cursos-detalle/cursos-detalle.component';

const routes: Routes = [
  { path: '', component: CursosComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'cursos/detalle/:id', component: CursosDetalleComponent },
  { path: 'cursos/:categoria_id', component: CursosComponent },
  { path: 'cursos/:categoria_id/:taller_id', component: CursosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
