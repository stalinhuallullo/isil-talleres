import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from '../../../models/categoria.model';
import { Edad } from '../../../models/edad.model';

import { Nivel } from '../../../models/nivel.model';
import { Seccion } from '../../../models/seccion.model';
import { Taller } from '../../../models/taller.model';
import { CategoriaService } from '../../../services/categoria.service';

import {Filtro} from '../../../models/filro.model';
import {SeccionesService} from '../../../services/secciones.service';
import {ActivatedRoute, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  indice: number;
  categorias: Categoria[];
  secciones: Seccion[];
  talleres: Taller[];

  edades: Edad[];
  niveles: Nivel[];


  form: FormGroup;
  filtroTaller: Filtro;


  talleres_dep: Taller[];
  edades_dep: Seccion[];
  taller_id: any;
  seleccionTaller: any;

  constructor(private categoriaService: CategoriaService, private seccionesService: SeccionesService, private fb: FormBuilder, private route: ActivatedRoute) {


    /*tmp*/
    this.talleres_dep = [];
    this.edades_dep = [];
    /*tmp*/

    this.indice = 0;
    this.categorias = [];
    this.secciones = [];
    this.talleres = [];
    this.edades = [];
    this.niveles = [];
    this.seleccionTaller = 0;

    this.form = this.fb.group({
      chTalleres: this.fb.array(this.talleres),
      categoria:  '',
      taller: '',
      edad: ''
    });

    this.route.params.subscribe(params => {this.filtrar();});

  }


  ngOnInit(): void {
    this.indice = 0;
    this.categoriaService.getCategorias().subscribe(response => {
      if (response) {
        this.categorias = response;
        this.filtrar();
      }
    });
  }

  filtrar(): void {

    const categoriaDefaultId = this.route.snapshot.paramMap.get('categoria_id');
    const tallerDefaultID = this.route.snapshot.paramMap.get('taller_id');



    this.form.get('categoria')?.setValue(categoriaDefaultId);

  }

  cambiarCategoria(id: string) {
  }

}
