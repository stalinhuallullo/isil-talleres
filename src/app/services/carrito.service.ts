import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Seccion} from '../modulos/catalogo/models/seccion.model';
import {Carrito} from '../models/carrito.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {


  emitter: Subject<Carrito>;

  constructor() {
    this.emitter = new Subject();
  }
  getEmitter(): Observable<Carrito> {
    return this.emitter.asObservable();
  }


  removeCarrito(): void {
    localStorage.removeItem('CARRITO');
    this.emitter.next(this.getCarrito());
  }

  setCarrito(carrito: Carrito): void {
    localStorage.setItem('CARRITO', JSON.stringify(carrito));
    this.emitter.next(this.getCarrito());
  }

  getCarrito(): Carrito {
    try {
      const obj = JSON.parse(localStorage.getItem('CARRITO'));
      if(obj != null) {
        const car: Carrito = obj;
        return car;
      }
      const c = new Carrito();
      c.secciones = [];
      return c;
    } catch(e) {
      const c = new Carrito();
      c.secciones = [];
      return c;
    }
  }

}
