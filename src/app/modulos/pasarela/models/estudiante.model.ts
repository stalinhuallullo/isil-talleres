import {GrupoSanguineo} from './grupoSanguineo.model';
import {Seguro} from './seguro.model';

export class Estudiante {
  id: number;
  numero_carnet: string;
  nombres: string;
  ape_paterno: string;
  ape_materno: string;
  sexo: string;
  dni: string;
  direccion: string;
  fecha_nacimiento: string;
  distrito_de_domicilio: string;
  telefono: string;
  movil: string;
  correo: string;
  seguro: Seguro;
  //seguro_id: string;
  enfermedades: string;
  medicinas: string;
  sanguineo: GrupoSanguineo;
  //sanguineo_id: string;

  departamento: string;
  provincia: string;
  distrito: string;
  apoderado_id: string;
}
