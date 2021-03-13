import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Sesion } from '../models/sesion.model';
import { pluck, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  sesion: Subject<Sesion>;


  constructor(private http: HttpClient) {
    this.sesion = new Subject();
  }


  getSecurity(): Observable<any> { // environment.API_NIUBIZ_CREDENCIAL
        let headers = new HttpHeaders().set('Authorization', 'Basic ' + environment.API_NIUBIZ_CREDENCIAL).set('Content-Type', 'text/plain; charset=utf-8');
        return this.http.post(`${environment.API_NIUBIZ_SECURITY}`, null, {headers, responseType: 'text'}).pipe(
            map( (res: any) => {
                return res;
            })
        );

  }


  getSession(obj: Object, token: any): Observable<any> {
      let headers = new HttpHeaders().set('Authorization', token).set('Content-Type', 'application/json');
      return this.http.post(`${environment.API_NIUBIZ_SESSION}/${environment.API_NIUBIZ_IDCOMERCIO}`, obj, {headers}).pipe(
          map( (res: any) => {
              return res;
          })
      );
  }




}
