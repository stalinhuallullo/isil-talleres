import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Seccion} from '../models/seccion.model';
import {map, pluck} from 'rxjs/operators';
import {SET_HEADERS} from '../../../utils/general.utils';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  emitter: Subject<Seccion>;

  constructor(private http: HttpClient) {
    this.emitter = new Subject();
  }

  getEmitter(): Observable<Seccion> {
    return this.emitter.asObservable();
  }

  getSecciones(): Observable<Seccion[]> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
        .get<Seccion[]>(`${environment.API_SECCIONES}`)
        .pipe(pluck('data'));


/*
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http.get(`${environment.API_SECCION}`, {headers}).pipe(
      pluck('data'),
      map( (res: Seccion[]) => {
        return res;
      })
    );
*/

  }

  /*
  setStorageContribuyentes(): Observable<Contribuyente[]> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http.get(`${environment.API_USUARIOS}/contribuyentes`, { headers }).pipe(
      pluck('data'),
      map( (res: Contribuyente[]) => {
        if(res.length > 0) localStorage.setItem('CONTRIBUYENTES', JSON.stringify(res));
        return res;
      })
    );
  }*/

}
