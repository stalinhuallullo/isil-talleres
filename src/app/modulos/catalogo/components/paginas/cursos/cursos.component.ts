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
  //categoria_id: any;
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


    if( this.categorias != null && this.categorias.length > 0){
      const tall = this.categorias.find(t => t.id == Number(categoriaDefaultId));
      this.talleres_dep = (tall != null) ? tall.talleres : [] ;
    }

    this.form.get('categoria')?.setValue(categoriaDefaultId);
    if(tallerDefaultID != null) this.form.get('taller')?.setValue(tallerDefaultID);

    if(tallerDefaultID == null) this.cambiarCategoria(categoriaDefaultId);
    else this.cambiarTaller(tallerDefaultID);
  }


  cambiarCategoria(id: string) {

    if(id != null && this.categorias.length > 0) {
      this.talleres_dep = this.categorias.find(t => t.id == Number(id))!.talleres;
      this.form.get('taller')?.setValue('');
      this.edades_dep = [];
      this.seccionesService.getSeccionesPorCategoria(this.talleres_dep[0].categoria.id).subscribe(response => {
        if (response) {
          this.seleccionTaller = 0;
          this.secciones = response;
        }
      });
    }

  }


  cambiarTaller(id: string) {
    const filtro = new Filtro();
    filtro.talleres = [ Number(id) ];
    this.form.get('edad')?.setValue('');
    this.seccionesService.filtrarSecciones(filtro).subscribe(response => {
      if (response) {
        this.seleccionTaller = id;
        this.secciones = response;
        this.edades_dep = [...new Map(this.secciones.map(item => [item['edad'].id, item])).values()];
      }
    });
  }


  cambiarEdad(id: string) {

    const filtro = new Filtro();
    filtro.talleres = [ this.form.get('taller')?.value ];
    filtro.categorias = [ this.form.get('categoria')?.value ];
    filtro.edades = [ Number(id) ];

    this.seccionesService.filtrarSecciones(filtro).subscribe(response => {
      if (response) {
        this.seleccionTaller = this.form.get('taller')?.value;
        this.secciones = response;
      }
    });

  }
}
