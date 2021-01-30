import {Seccion} from '../modulos/catalogo/models/seccion.model';
import {Estudiante} from '../modulos/pasarela/models/estudiante.model';
import {Apoderado} from '../modulos/pasarela/models/apoderado.model';

export class Carrito {
  estudiante: Estudiante;
  secciones: Seccion[];
}
