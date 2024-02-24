import {RouterModule, Routes} from "@angular/router";
import {AmountInputComponent} from "./amount-input/amount-input.component";
import {NgModule} from "@angular/core";
import {AmountDisplayComponent} from "./amount-display/amount-display.component";
import {AmountCalcContainerComponent} from "./amount-calc-container.component";
import {inputGuard} from "./input-guard.const";

export const routes: Routes = [
  {
    path: '',
    component: AmountCalcContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'amount-input',
        pathMatch: 'full',
      },
      {
        path: 'amount-input',
        component: AmountInputComponent,
      },
      {
        path: 'amount-display',
        component: AmountDisplayComponent,
        canActivate: [inputGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmountCalcRoutingModule {}

