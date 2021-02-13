import {Component, Input, OnInit} from '@angular/core';
import {Seccion} from '../../../models/seccion.model';
import {roundTo} from '../../../../../utils/general.utils';
import {CarritoService} from '../../../../../services/carrito.service';
import {Carrito} from '../../../../../models/carrito.model';

@Component({
  selector: 'app-item-curso',
  templateUrl: './item-curso.component.html',
  styleUrls: ['./item-curso.component.css']
})
export class ItemCursoComponent implements OnInit {

  @Input() ele: Seccion;
  secciones: Seccion[];
  isSeleccionado: boolean;
  cuposDisponibles: number;

  constructor(private carritoService: CarritoService) {
    this.isSeleccionado = false;
    this.cuposDisponibles = 0;
  }

  ngOnInit(): void {
    this.secciones = this.carritoService.getCarrito()?.secciones;
    this.cuposDisponibles = (this.ele.maximo - this.ele.inscritos);

    //filter
    this.isSeleccionado =  this.secciones.filter( (seccion) => seccion.id == this.ele.id  ).length > 0;

  }

  parseNumber(num: number){
    return roundTo(num, 2);
  }

  agregarCarrito(ele: Seccion): void {

    let car: Carrito;
    car = this.carritoService.getCarrito();
    car.secciones.push(ele);
    this.carritoService.setCarrito(car);
    this.isSeleccionado = true;

  }

  validarImagen(ele: Seccion): string{
    let url: string = 'https://www.munisantanita.gob.pe/data/talleres/cursos/';
    let url_default: string = url + 'curso-default.jpg';
    return (ele.imagen != null && ele.imagen.length > 0) ? url + ele.imagen : ( (ele.taller.imagen != null && ele.taller.imagen.length > 0) ? url +  ele.taller.imagen : url_default);
  }

}
