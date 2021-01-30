import {Estudiante} from './estudiante.model';
import {MatriculaDetalle} from './matriculaDetalle.model';
import {Transaccion} from './transaccion.model';

export class Matricula {
  id: number;
  recibo_id: string;
  nro_recibo: string;
  importe: number;
  estudiante: Estudiante;
  fecha: Date;
  estado: string;
  detalles: MatriculaDetalle[];
  transaccion: Transaccion;
}
