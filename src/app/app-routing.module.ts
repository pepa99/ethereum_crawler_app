import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceDialogComponent } from './balance-dialog/balance-dialog.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {path: 'transactions', component: TransactionsComponent},
  {path: 'balance-dialog', component: BalanceDialogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
