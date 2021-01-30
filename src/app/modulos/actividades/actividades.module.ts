import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActividadesRoutingModule} from './actividades-routing.module';
import { NoticiasComponent } from './components/paginas/noticias/noticias.component';
import { NoticiasDetalleComponent } from './components/paginas/noticias-detalle/noticias-detalle.component';




@NgModule({
  declarations: [NoticiasComponent, NoticiasDetalleComponent],
  imports: [
    CommonModule,
    ActividadesRoutingModule
  ]
})
export class ActividadesModule { }
