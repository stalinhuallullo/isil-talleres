import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Seccion} from '../models/seccion.model';
import {map, pluck} from 'rxjs/operators';
import {SET_HEADERS} from '../../../utils/general.utils';
import {Filtro} from '../models/filro.model';
import {Taller} from '../models/taller.model';
import {TallerDetalle} from '../models/tallerDetalle.model';


@Injectable({
  providedIn: 'root'
})
export class SeccionesService {

  emitter: Subject<Seccion>;
  seccion: Subject<Seccion>;

  constructor(private http: HttpClient) {
    this.emitter = new Subject();
    this.seccion = new Subject();
  }

  getEmitter(): Observable<Seccion> {
    return this.emitter.asObservable();
  }

  /*getSecciones(): Observable<Seccion[]> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<Seccion[]>(`${environment.API_SECCIONES}`)
      .pipe(pluck('data'));
  }*/

  filtrarSecciones(filtro: Filtro): Observable<Seccion[]> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .post<Seccion[]>(`${environment.API_SECCIONES}/filter`, filtro,  { headers })
      .pipe(pluck('data'));
  }

  getSeccionesPorCategoria(cod: number): Observable<Seccion[]> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<Seccion[]>(`${environment.API_SECCIONES}/categoria/${cod}`)
      .pipe(pluck('data'));
  }

}

