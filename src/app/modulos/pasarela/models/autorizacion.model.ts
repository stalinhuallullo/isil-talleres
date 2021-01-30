import {Orden} from './orden.model';

export class Autorizacion {
  antifraud: string;
  captureType: string;
  channel: string;
  countable: boolean;
  order: Orden;
  recurrence: string;
  sponsored: string;
  transactionToken: string;
}
