import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {roundTo} from '../../../../../utils/general.utils';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CarritoService} from '../../../../../services/carrito.service';
import {Seccion} from '../../../../catalogo/models/seccion.model';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  secciones: Seccion[];
  total: number;


  constructor(private fb: FormBuilder, private router: Router, private datePipe: DatePipe, private carritoService: CarritoService) {
    this.total = 0;
  }


  ngOnInit(): void {
    this.secciones = this.carritoService.getCarrito()?.secciones;
    let t = this;
    t.total = 0;
    this.secciones.forEach(sec => {
      t.total += sec.precio;
    });
    this.total = this.parseNumber(t.total);

  }

  parseNumber(num: number){
    return roundTo(num, 2);
  }

}
