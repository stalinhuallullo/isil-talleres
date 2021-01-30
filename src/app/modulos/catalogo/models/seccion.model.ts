import {Taller} from './taller.model';
import {Edad} from './edad.model';
import {Nivel} from './nivel.model';
import {Temporada} from './temporada.model';
import {Hora} from './hora.model';
import {Dia} from './dia.model';
import {Lugar} from './lugar.model';

export class Seccion {
  id ?: number;
  descripcion?: string;
  taller: Taller;
  edad: Edad;
  temporada: Temporada;
  hora: Hora;
  dia: Dia;
  lugar: Lugar;
  precio: number;
  calificacion: number;
  fecha: string;
  fecha_desde: Date;
  fecha_hasta: Date;
  imagen: string;
  portada: string;
  estado: number;
  minimo: number;
  maximo: number;
  inscritos: number;
}
