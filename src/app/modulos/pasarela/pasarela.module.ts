import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { PasarelaRoutingModule } from './pasarela-routing.module';
import { CheckoutComponent } from './components/paginas/checkout/checkout.component';
import { ShoppingComponent } from './components/paginas/shopping/shopping.component';
import { VoucherComponent } from './components/paginas/voucher/voucher.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [CheckoutComponent,ShoppingComponent, VoucherComponent],
    imports: [
        CommonModule,
        PasarelaRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PasarelaModule { }
