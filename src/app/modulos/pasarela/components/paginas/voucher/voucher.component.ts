import { Component, OnInit } from '@angular/core';
import {Seccion} from '../../../../catalogo/models/seccion.model';
import {CarritoService} from '../../../../../services/carrito.service';
import {roundTo} from '../../../../../utils/general.utils';
import {Estudiante} from '../../../models/estudiante.model';
import {Carrito} from '../../../../../models/carrito.model';
import {ActivatedRoute} from '@angular/router';
import {CheckoutService} from '../../../services/checkout.service';
import {Matricula} from '../../../models/matricula.model';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-vaucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']

})
export class VoucherComponent implements OnInit {

  secciones: Seccion[];
  estudiante: Estudiante;
  carrito: Carrito;
  total: number;
  id: any;
  dni: any;
  matricula: Matricula;

  constructor(private route: ActivatedRoute, private carritoService: CarritoService, private checkoutService: CheckoutService) {
    this.total = 0;
    this.id = this.route.snapshot.paramMap.get('id');
    this.dni = this.route.snapshot.paramMap.get('dni');
  }

  ngOnInit(): void {
    this.carrito = this.carritoService.getCarrito();
    this.secciones = this.carrito?.secciones;
    this.estudiante = this.carrito?.estudiante;
    this.cacularImporte();
    this.getMatricula(this.id, this.dni);
    this.carritoService.removeCarrito();
  }

  exportAsPDF() {
    window.print();


    /*var doc = new jsPDF();
    doc.text(20, 20, 'Hello world!');
    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    doc.addPage();
    doc.text(20, 20, 'Do you like that?');

    // Save the PDF
    doc.save('Test.pdf');*/
  }

  getMatricula(id: number, dni: string): void{
    this.checkoutService.getMatricula(id, dni).subscribe(response => {
      this.matricula = response;
    });
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


  validarImagen(ele: Seccion) {
    let url: string = 'https://www.munisantanita.gob.pe/data/talleres/cursos/';
    let url_default: string = url + 'curso-default.jpg';
    return (ele.imagen != null && ele.imagen.length > 0) ? url + ele.imagen : ( (ele.taller.imagen != null && ele.taller.imagen.length > 0) ? url +  ele.taller.imagen : url_default);
  }
}
