import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Sesion } from '../../models/sesion.model';
import {environment} from '../../../../../environments/environment';
import {CheckoutService} from '../../services/checkout.service';
import {Orden} from '../../models/orden.model';
import {Autorizacion} from '../../models/autorizacion.model';

@Component({
  selector: 'app-modal-niubiz',
  templateUrl: './modal-niubiz.component.html',
  styleUrls: ['./modal-niubiz.component.css']
})
export class ModalNiubizComponent implements OnInit {

  @Input() public data: Sesion;
  url: any;

  constructor(public activeModal: NgbActiveModal, private router: Router, private sanitizer:DomSanitizer, private checkoutService: CheckoutService) {
  }

  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(environment.API_PAGOSENLINEA_TRANSACCION + '/form?merchantId=' + this.data.merchantId + '&moneda=PEN&importe=' + this.data.amount + '&nombre=' + this.data.cardholdername + '&apellido=' + this.data.cardholderlastname + '&email=' + this.data.cardholderemail + '&purchasenumber=' + this.data.purchaseNumber + '&sesion=' + this.data.sessionKey + '&urltimeout=' + this.data.timeouturl);
  }

  @HostListener("window:message",["$event"])
  comunicarIframe($event:MessageEvent) {

    const t = this;
    if($event?.data?.type == 'iframeData'){

      const obj = JSON.parse($event.data.message);

      if(this.data.tokenSesion.length > 0){
        this.activeModal.close( obj.transactionToken[0]);

      }

    }
  }



}
