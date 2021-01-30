import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { SET_HEADERS } from 'src/app/utils/general.utils';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria.model';
import {Seccion} from '../models/seccion.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  emitter: Subject<Categoria>;

  constructor(private http: HttpClient) {
    this.emitter = new Subject();
  }

  getEmitter(): Observable<Categoria> {
    return this.emitter.asObservable();
  }


  getCategorias(): Observable<Categoria[]> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
        .get<Categoria[]>(`${environment.API_CATEGORIAS}`)
        .pipe(pluck('data'));
  }



}
