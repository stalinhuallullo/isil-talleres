import { Component, OnInit } from '@angular/core';
import {CatalogoService} from '../../../services/catalogo.service';
import {Seccion} from '../../../models/seccion.model';
import {SeccionesService} from '../../../services/secciones.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {



  categoria1: Seccion[];
  categoria2: Seccion[];
  categoria3: Seccion[];
  categoria4: Seccion[];
  categoria5: Seccion[];
  categoria6: Seccion[];
  categoria7: Seccion[];
  id: any;
  showTab: string;


  constructor(private service: CatalogoService, private serviceSecciones: SeccionesService) {
    this.categoria1 = [];
    this.categoria2 = [];
    this.categoria3 = [];
    this.categoria4 = [];
    this.categoria5 = [];
    this.categoria6 = [];
    this.categoria7 = [];
    this.id = 1;

    this.showTab = 'academia';

  }

  ngOnInit(): void {

    this.getSeccionesPorCategoria(1);
    this.getSeccionesPorCategoria(3);
    this.getSeccionesPorCategoria(4);
    this.getSeccionesPorCategoria(5);
    this.getSeccionesPorCategoria(9);
    this.getSeccionesPorCategoria(8);
    this.getSeccionesPorCategoria(6);

  }

  getSeccionesPorCategoria(cod: number): void{
    this.serviceSecciones.getSeccionesPorCategoria(cod).subscribe(data => {
      if(cod == 1)  this.categoria1 = data;
      if(cod == 3)  this.categoria2 = data;
      if(cod == 4)  this.categoria3 = data;
      if(cod == 5)  this.categoria4 = data;
      if(cod == 9)  this.categoria5 = data;
      if(cod == 8)  this.categoria6 = data;
      if(cod == 6)  this.categoria7 = data;
    });
  }


  camiarTab(cat: string): void {
    this.showTab = cat;
  }
}
