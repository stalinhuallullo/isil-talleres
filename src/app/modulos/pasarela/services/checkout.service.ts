import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {GrupoSanguineo} from '../models/grupoSanguineo.model';
import {HttpClient} from '@angular/common/http';
import {Categoria} from '../../catalogo/models/categoria.model';
import {SET_HEADERS} from '../../../utils/general.utils';
import {environment} from '../../../../environments/environment';
import { pluck, map } from 'rxjs/operators';
import {Seguro} from '../models/seguro.model';
import {Estudiante} from '../models/estudiante.model';
import {Apoderado} from '../models/apoderado.model';
import {Departamento} from '../models/departamento.model';
import {Provincia} from '../models/provincia.model';
import {Distrito} from '../models/distrito.model';
import {Matricula} from '../models/matricula.model';
import {MatriculaDetalle} from '../models/matriculaDetalle.model';
import {Sesion} from '../models/sesion.model';
import {Autorizacion} from '../models/autorizacion.model';
import {Transaccion} from '../models/transaccion.model';
import {Operacion} from '../models/operacion.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  sanguineos: Subject<GrupoSanguineo>;
  seguros: Subject<Seguro>;

  constructor(private http: HttpClient) {
    this.sanguineos = new Subject();
    this.seguros = new Subject();
  }

  getSanguineos(): Observable<GrupoSanguineo[]> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<GrupoSanguineo[]>(`${environment.API_SANGUINEOS}`)
      .pipe(pluck('data'));
  }

  getSeguros(): Observable<GrupoSanguineo[]> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<GrupoSanguineo[]>(`${environment.API_SEGUROS}`)
      .pipe(pluck('data'));
  }

  getDepartamentos(): Observable<Departamento[]> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<Departamento[]>(`${environment.API_UBIGEO}`)
      .pipe(pluck('data'));
  }

  getProvincias(cod: string): Observable<Provincia[]> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<Provincia[]>(`${environment.API_UBIGEO}/${cod}/provincias`)
      .pipe(pluck('data'));
  }

  getDistritos(cod: string): Observable<Distrito[]> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<Distrito[]>(`${environment.API_UBIGEO}/${cod}/distritos`)
      .pipe(pluck('data'));
  }

  buscarEstudiantePorDni(cod: string): Observable<Estudiante> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<Estudiante>(`${environment.API_ESTUDIANTES}/${cod}/buscar`)
      .pipe(pluck('data'));
  }

  buscarApoderadoPorDni(cod: string): Observable<Apoderado> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<Apoderado>(`${environment.API_APODERADOS}/${cod}/buscar`)
      .pipe(pluck('data'));
  }

  buscarApoderadoPorId(cod: string): Observable<Apoderado> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<Apoderado>(`${environment.API_APODERADOS}/${cod}`)
      .pipe(pluck('data'));
  }

  guardarEstudiante(estudiante: Estudiante): Observable<Estudiante> {

    const headers = SET_HEADERS(true, true, true, true, '');
    return this.http.post(`${environment.API_ESTUDIANTES}`, estudiante, { headers }).pipe(
      pluck('data'),
      map( (response: any) => {
        return response;
      })
    );
  }

  guardarMatricula(matricula: Matricula): Observable<Matricula> {

    const headers = SET_HEADERS(true, true, true, true, '');
    return this.http.post(`${environment.API_MATRICULAS}`, matricula, { headers }).pipe(
      pluck('data'),
      map( (response: any) => {
        return response;
      })
    );
  }

  guardarMatriculaDetalle(detalle: MatriculaDetalle): Observable<MatriculaDetalle> {

    const headers = SET_HEADERS(true, true, true, true, '');
    return this.http.post(`${environment.API_MATRICULAS}/detalle`, detalle, { headers }).pipe(
      pluck('data'),
      map( (response: any) => {
        return response;
      })
    );
  }

  getMatricula(id: number, dni: string): Observable<Matricula> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<Matricula>(`${environment.API_MATRICULAS}/${id}/${dni}`)
      .pipe(pluck('data'));
  }

  /*getMatriculaDetalles(cod: string): Observable<MatriculaDetalle> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<Provincia[]>(`${environment.API_UBIGEO}/${cod}/provincias`)
      .pipe(pluck('data'));
  }*/


  guardarApoderado(obj: Apoderado): Observable<Apoderado> {

    const headers = SET_HEADERS(true, true, true, true, '');
    return this.http.post(`${environment.API_APODERADOS}`, obj, { headers }).pipe(
      pluck('data'),
      map( (response: any) => {
        return response;
      })
    );
  }

  consultarTransaccion(operacion: Operacion): Observable<Object> {

    const headers = SET_HEADERS(true, true, true, true, '');
    return this.http.post(`${environment.API_TRANSACCIONES}/authorization`, operacion, { headers }).pipe(
      map( (response: any) => {
        return response;
      })
    );
  }

  guardarTransaccion(transaccion: Transaccion): Observable<Transaccion> {

    const headers = SET_HEADERS(true, true, true, true, '');
    return this.http.post(`${environment.API_TRANSACCIONES}`, transaccion, { headers }).pipe(
      pluck('data'),
      map( (response: any) => {
        return response;
      })
    );
  }


  consultarIP(): Observable<Object> {
    const headers = SET_HEADERS(false, false, true, true, '');
    return this.http
      .get<Object>('https://api.ipify.org/?format=json');
  }

}
