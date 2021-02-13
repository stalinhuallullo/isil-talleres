import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortadaComponent } from './layouts/web/portada/portada.component';
import { ContenedorComponent } from './layouts/web/contenedor/contenedor.component';
import { ModulosModule } from './modulos/modulos.module';
import { ActividadesRoutingModule } from './modulos/actividades/actividades-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ResumenCarritoComponent} from './components/resumen-carrito/resumen-carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    PortadaComponent,
    ContenedorComponent,
    ResumenCarritoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModulosModule,
    ActividadesRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
