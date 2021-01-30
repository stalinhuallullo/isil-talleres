import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulosRoutingModule } from './modulos-routing.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { PasarelaModule } from './pasarela/pasarela.module';
import {ActividadesModule} from './actividades/actividades.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModulosRoutingModule,
    CatalogoModule,
    PasarelaModule,
    ActividadesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModulosModule { }
