import {Estudiante} from './estudiante.model';
import {Seccion} from '../../catalogo/models/seccion.model';
import {Taller} from '../../catalogo/models/taller.model';

export class MatriculaDetalle {
  id: number;
  seccion: Seccion;
  matricula_id: number;
  descuento: number;
  importe: number;
}
