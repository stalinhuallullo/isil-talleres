import { Component, OnInit } from '@angular/core';
import {Seccion} from '../../../models/seccion.model';
import {TallerDetalleService} from '../../../services/tallerDetalle.service';
import {ActivatedRoute} from '@angular/router';
import {TallerDetalle} from '../../../models/tallerDetalle.model';
import {roundTo} from '../../../../../utils/general.utils';
import {CarritoService} from '../../../../../services/carrito.service';

@Component({
  selector: 'app-cursos-detalle',
  templateUrl: './cursos-detalle.component.html',
  styleUrls: ['./cursos-detalle.component.css']
})
export class CursosDetalleComponent implements OnInit {

  seccion: Seccion;
  tallerDetalleLogos: TallerDetalle[];
  tallerDetalleSilabus: TallerDetalle[];
  tallerDetalleMetodoDeEvaluacion: TallerDetalle[];
  id: any;
  tallerId: any;
  secciones: Seccion[];

  constructor(
    private seccionService: TallerDetalleService,
    private seccionDetalleService: TallerDetalleService,
    private route: ActivatedRoute,
    private carritoService: CarritoService
  ) {
    this.seccion = new Seccion();
    this.tallerDetalleLogos = [];
    this.tallerDetalleSilabus = [];
    this.tallerDetalleMetodoDeEvaluacion = [];
    this.id = this.route.snapshot.paramMap.get('id');
    this.tallerId = '0';
  }

  ngOnInit(): void {
    this.getSeccion(this.id);
    this.secciones = this.carritoService.getCarrito()?.secciones;
  }

  parseNumber(num: number){
    return roundTo(num, 2);
  }

  getSeccion(cod: string): void{
    this.seccionService.getSeccion(cod).subscribe(response => {
      this.seccion = response;
      this.tallerId =  this.seccion.taller.id;
      this.getTallerDetalleLogos(this.tallerId, '1');
      this.getTallerDetalleLogos(this.tallerId, '2');
      this.getTallerDetalleLogos(this.tallerId, '3');
    });
  }

  /* 1 = silabus, 2 = Logos, 3 = metodo de evaluacion
  * ****/
  getTallerDetalleLogos(cod: string, codContenido: string): any{
    this.seccionDetalleService.getTallerDetalle(cod, codContenido).subscribe(response => {
      if(codContenido == '1') this.tallerDetalleSilabus = response;
      if(codContenido == '2') this.tallerDetalleLogos = response;
      if(codContenido == '3') this.tallerDetalleMetodoDeEvaluacion = response;
    });
  }

  validarImagen(ele: Seccion): string{
    let url: string = 'https://www.munisantanita.gob.pe/data/talleres/cursos/';
    let url_default: string = url + 'curso-default.jpg';
    return (ele?.imagen != null && ele.imagen?.length > 0) ? url + ele?.imagen : ( (ele.taller?.imagen != null && ele.taller?.imagen.length > 0) ? url +  ele.taller?.imagen : url_default);
  }

}
