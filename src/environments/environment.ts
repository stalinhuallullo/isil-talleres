const API_BASE_TALLERES = 'http://localhost:8081/taller-service/';
const API_BASE_TALLERES_RESOURCES = 'https://www.munisantanita.gob.pe/data/talleres/';

export const environment = {
  production: false,
  API_SECCIONES: API_BASE_TALLERES + 'secciones',
  API_TALLERES: API_BASE_TALLERES + 'talleres',
  API_SANGUINEOS: API_BASE_TALLERES + 'sanguineos',
  API_SEGUROS: API_BASE_TALLERES + 'seguros',
  API_ESTUDIANTES: API_BASE_TALLERES + 'estudiantes',
  API_APODERADOS: API_BASE_TALLERES + 'apoderados',
  API_MATRICULAS: API_BASE_TALLERES + 'matriculas',
  API_UBIGEO: API_BASE_TALLERES + 'ubigeo',
  API_CATEGORIAS: API_BASE_TALLERES + 'categorias',
  API_TRANSACCIONES: API_BASE_TALLERES + 'transacciones',
  API_INSCRITOS: API_BASE_TALLERES + 'inscripciones',
  API_RESOURCE_IMAGE_DEFAULT: API_BASE_TALLERES_RESOURCES + 'cursos/curso-default.jpg',
  API_RESOURCE_IMAGE: API_BASE_TALLERES_RESOURCES + 'cursos/',

};
