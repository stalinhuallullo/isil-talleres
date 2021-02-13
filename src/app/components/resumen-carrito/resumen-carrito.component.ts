import { Component, OnInit } from '@angular/core';
import {Concepto} from '../../models/concepto.model';
import {Subscription} from 'rxjs';
import {SeccionesService} from '../../modulos/catalogo/services/secciones.service';
import {CarritoService} from '../../services/carrito.service';
import {Carrito} from '../../models/carrito.model';
import {roundTo} from '../../utils/general.utils';
import {Seccion} from '../../modulos/catalogo/models/seccion.model';
import {computeStartOfLinePositions} from '@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file';

@Component({
  selector: 'app-resumen-carrito',
  templateUrl: './resumen-carrito.component.html',
  styleUrls: ['./resumen-carrito.component.css']
})
export class ResumenCarritoComponent implements OnInit {


  secciones: Seccion[];
  importes: Concepto;
  total: number;
  cantidadCarrito: number;

  carritoEmitterSubscription: Subscription;

  constructor(private carritoService: CarritoService) {
    this.total = 0;
  }

  ngOnInit(): void {
    //this.carritoService.removeCarrito();
    this.secciones = this.carritoService.getCarrito()?.secciones;

    this.cacularImporte();


    this.carritoEmitterSubscription = this.carritoService.getEmitter().subscribe((carrito: Carrito) => {
      this.secciones = carrito.secciones;
      this.cacularImporte();
    });

  }

  eliminarSeccionCarrito(seccion: Seccion): void{
    let car: Carrito;
    car = this.carritoService.getCarrito();
    const indice = car.secciones.findIndex(sec => {return sec.id == seccion.id; });

    car.secciones.splice(indice, 1);
    this.carritoService.setCarrito(car);
    this.cacularImporte();
  }




  cacularImporte(): void{
    let t = this;
    t.total = 0;
    let sec = this.carritoService.getCarrito()?.secciones;
    t.cantidadCarrito = sec.length;
    sec.forEach(sec => {
      t.total += sec.precio;
    });
  }


  parseNumber(num: number){
    return roundTo(num, 2);
  }

  validarImagen(ele: Seccion): string{
    let url: string = 'https://www.munisantanita.gob.pe/data/talleres/cursos/';
    let url_default: string = url + 'curso-default.jpg';
    return (ele.imagen != null && ele.imagen.length > 0) ? url + ele.imagen : ( (ele.taller.imagen != null && ele.taller.imagen.length > 0) ? url +  ele.taller.imagen : url_default);
  }



}
