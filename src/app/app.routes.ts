import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'amount-calc',
    loadChildren: () => import('./amount-calc/amount-calc.module').then(m => m.AmountCalcModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'amount-calc',
  }
];
