import {Categoria} from './categoria.model';

export class Taller {
  id: number;
  nombre: string;
  imagen: string;
  imagen_portada: string;
  categoria: Categoria;
  indice: number;
  checked: boolean;
}
