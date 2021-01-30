import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CursosComponent } from './components/paginas/cursos/cursos.component';
import { CursosDetalleComponent } from './components/paginas/cursos-detalle/cursos-detalle.component';
import { InicioComponent } from './components/paginas/inicio/inicio.component';
import { ItemCursoComponent } from './components/fragments/item-curso/item-curso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [CursosComponent, CursosDetalleComponent, InicioComponent, ItemCursoComponent],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class CatalogoModule { }
