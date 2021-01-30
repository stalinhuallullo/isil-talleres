import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { SET_HEADERS } from 'src/app/utils/general.utils';
import { environment } from 'src/environments/environment';
import {Seccion} from '../models/seccion.model';
import {Taller} from '../models/taller.model';
import {TallerDetalle} from '../models/tallerDetalle.model';

@Injectable({
  providedIn: 'root'
})
export class TallerDetalleService {

  seccion: Subject<Seccion>;
  seccionDetalle: Subject<TallerDetalle[]>;

  constructor(private http: HttpClient) {
    this.seccion = new Subject();
    this.seccionDetalle = new Subject();
  }

  getSeccion(cod: string): Observable<Seccion> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<Seccion>(`${environment.API_SECCIONES}/${cod}`)
      .pipe(pluck('data'));
  }

  getTallerDetalle(cod: string, codContenido: string): Observable<TallerDetalle[]> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<TallerDetalle[]>(`${environment.API_TALLERES}/contenido/${cod}/${codContenido}`)
      .pipe(pluck('data'));
  }


}
