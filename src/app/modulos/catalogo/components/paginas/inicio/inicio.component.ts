import { Component, OnInit } from '@angular/core';
import {CatalogoService} from '../../../services/catalogo.service';
import {Seccion} from '../../../models/seccion.model';
import {SeccionesService} from '../../../services/secciones.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  categoria2: Seccion[];
  categoria4: Seccion[];
  categoria5: Seccion[];
  categoria7: Seccion[];
  id: any;
  showTab: string;


  constructor(private service: CatalogoService, private serviceSecciones: SeccionesService, private modalService: NgbModal) {
    this.categoria2 = [];
    this.categoria4 = [];
    this.categoria5 = [];
    this.categoria7 = [];
    this.id = 1;

    this.showTab = 'educativo';

  }

  ngOnInit(): void {

    this.getSeccionesPorCategoria(3);
    this.getSeccionesPorCategoria(5);
    this.getSeccionesPorCategoria(9);
    this.getSeccionesPorCategoria(6);

    Swal.fire({
      imageUrl: 'https://www.munisantanita.gob.pe/data/web/recursos/isil-promo-1.jpeg',
      imageAlt: 'Custom image',
      html:'<h3>Cursos en los que se aplica la promoción</h3><br>' +
        '<p><strong>Fútbol (7 - 15 años)</strong></p>' +
        '<p><strong>Vóley (7 - 15 años)</strong></p>' +
        '<p><strong>Oratoria Kids (5 - 7 años)</strong></p>',
      width: '60rem',
      showConfirmButton: false
    })
  }

  getSeccionesPorCategoria(cod: number): void{
    this.serviceSecciones.getSeccionesPorCategoria(cod).subscribe(data => {
      if(cod == 3)  this.categoria2 = data;
      if(cod == 5)  this.categoria4 = data;
      if(cod == 9)  this.categoria5 = data;
      if(cod == 6)  this.categoria7 = data;
    });
  }

  camiarTab(cat: string): void {
    this.showTab = cat;
  }
}
