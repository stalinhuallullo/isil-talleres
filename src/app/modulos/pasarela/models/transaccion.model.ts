import {Orden} from './orden.model';

export class Transaccion {
  id: string;
  estudiante_id: string;
  monto_total: string;
  tipo_tarjeta: string;
  transaccion_id: string;
  purchaseNumber: string;
  respuesta_json: string;
  fecha: Date;
  estado: string;
  card: string;
  currency: string;
}
