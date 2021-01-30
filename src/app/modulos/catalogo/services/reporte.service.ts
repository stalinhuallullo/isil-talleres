import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Seccion} from '../models/seccion.model';
import {HttpClient} from '@angular/common/http';
import {Inscrito} from '../models/inscrito.model';
import {SET_HEADERS} from '../../../utils/general.utils';
import {environment} from '../../../../environments/environment';
import {pluck} from 'rxjs/operators';
import {InscritosPorSecciones} from '../models/inscritosPorSecciones.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  emitter: Subject<Inscrito>;

  constructor(private http: HttpClient) {
    this.emitter = new Subject();
  }

  getEmitter(): Observable<Inscrito> {
    return this.emitter.asObservable();
  }

  getInscritos(): Observable<Inscrito[]> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<Inscrito[]>(`${environment.API_INSCRITOS}`)
      .pipe(pluck('data'));
  }

  getInscritosPorSecciones(): Observable<InscritosPorSecciones[]> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<InscritosPorSecciones[]>(`${environment.API_INSCRITOS}/total-de-inscritos-por-secciones`)
      .pipe(pluck('data'));
  }

}
