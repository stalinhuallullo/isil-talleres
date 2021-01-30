import {Antifraud} from './antifraud.model';

export class Sesion {
    id: number;
    channel: string;
    amount: number;
    antifraud: Antifraud;
    fechaExpiracion: string;
    tiempoExpiracion: string;
    sessionKey: string;
    tokenSesion: string;
    merchantId: string;
    purchaseNumber: string;
    cardholdername: string;
    cardholderlastname: string;
    cardholderemail: string;
    timeouturl: string;
    matriculaId: number;
    estudianteDni: string;
}
