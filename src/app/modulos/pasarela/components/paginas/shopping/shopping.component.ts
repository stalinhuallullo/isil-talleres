import { Component, OnInit } from '@angular/core';
import {CarritoService} from '../../../../../services/carrito.service';
import {roundTo} from '../../../../../utils/general.utils';
import {Seccion} from '../../../../catalogo/models/seccion.model';
import {Carrito} from '../../../../../models/carrito.model';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {


  secciones: Seccion[];
  total: number;

  constructor(private carritoService: CarritoService) {
    this.total = 0;
  }

  ngOnInit(): void {

    this.secciones = this.carritoService.getCarrito()?.secciones;
    this.cacularImporte();
  }


  eliminarSeccionCarrito(seccion: Seccion): void{
    Swal.fire({
      title: '¿Realmente desea eliminar el taller de su carrito?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'Su taller ha sido eliminado.',
          'success'
        );
        let car: Carrito;
        car = this.carritoService.getCarrito();
        const indice = car.secciones.findIndex(sec => {
          return sec.id == seccion.id;
        });

        car.secciones.splice(indice, 1);
        this.carritoService.setCarrito(car);
        this.secciones = this.carritoService.getCarrito()?.secciones;
        this.cacularImporte();
      }
    })

  }

  cacularImporte(): void{
    let t = this;
    t.total = 0;
    let sec = this.carritoService.getCarrito()?.secciones;
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
