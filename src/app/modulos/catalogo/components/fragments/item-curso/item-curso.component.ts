import {Component, Input, OnInit} from '@angular/core';
import {Seccion} from '../../../models/seccion.model';
import {roundTo} from '../../../../../utils/general.utils';
import {CategoriaService} from '../../../services/categoria.service';
import {CarritoService} from '../../../../../services/carrito.service';
import {Carrito} from '../../../../../models/carrito.model';
import { environment } from 'src/environments/environment';
import {Subscription} from 'rxjs';
import {Concepto} from '../../../../../models/concepto.model';

@Component({
  selector: 'app-item-curso',
  templateUrl: './item-curso.component.html',
  styleUrls: ['./item-curso.component.css']
})
export class ItemCursoComponent implements OnInit {

  @Input() ele: Seccion;

  constructor(private carritoService: CarritoService) {

  }

  ngOnInit(): void {

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
