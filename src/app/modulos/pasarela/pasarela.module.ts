import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { PasarelaRoutingModule } from './pasarela-routing.module';
import { CheckoutComponent } from './components/paginas/checkout/checkout.component';
import { ShoppingComponent } from './components/paginas/shopping/shopping.component';
import { VoucherComponent } from './components/paginas/voucher/voucher.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalNiubizComponent} from './fragments/modal-niubiz/modal-niubiz.component';



@NgModule({
  declarations: [CheckoutComponent,ShoppingComponent, VoucherComponent, ModalNiubizComponent],
    imports: [
        CommonModule,
        PasarelaRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PasarelaModule { }
