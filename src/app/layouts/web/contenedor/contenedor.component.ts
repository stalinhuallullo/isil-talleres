import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/modulos/catalogo/models/categoria.model';
import { CategoriaService } from 'src/app/modulos/catalogo/services/categoria.service';
import {Subscription} from 'rxjs';
import {Concepto} from '../../../models/concepto.model';
import {CarritoService} from '../../../services/carrito.service';
import {Carrito} from '../../../models/carrito.model';
import {roundTo} from '../../../utils/general.utils';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.css']
})
export class ContenedorComponent implements OnInit {

  categorias: Categoria[];

  constructor(private categoriaService: CategoriaService) {
    if(environment.production && (window.location.hostname.indexOf("www") !== 0 || window.location.protocol == "http:"))  window.location.href = 'https://www.munisantanita.gob.pe/talleres/'+window.location.hash;
    this.categorias = [];
  }

  ngOnInit(): void {

    this.categoriaService.getCategorias().subscribe(response => {
      if (response) {
        this.categorias = response;
      }
    });



  }

  parseNumber(num: number){
    return roundTo(num, 2);
  }



  irCategoria($e: Event, cat: Categoria): void{

      console.log(cat);

  }




}
