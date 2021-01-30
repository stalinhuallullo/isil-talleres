import {Autorizacion} from './autorizacion.model';
import {Estudiante} from './estudiante.model';
import {Apoderado} from './apoderado.model';
import {Seccion} from '../../catalogo/models/seccion.model';

export class Operacion {
  autorizacion: Autorizacion;
  estudiante: Estudiante;
  apoderado: Apoderado;
  secciones: Seccion[];
}
