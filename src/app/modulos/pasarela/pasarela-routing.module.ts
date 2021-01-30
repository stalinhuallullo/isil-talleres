import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from './components/paginas/shopping/shopping.component';
import { CheckoutComponent } from './components/paginas/checkout/checkout.component';
import {VoucherComponent} from './components/paginas/voucher/voucher.component';

const routes: Routes = [
  { path: '', component: ShoppingComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'voucher/:id/:dni', component: VoucherComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasarelaRoutingModule { }
