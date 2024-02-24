import {NgModule} from "@angular/core";
import {AmountCalcRoutingModule} from "./amount-calc-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FinAmountService} from "../services/fin-amount.service";
import {CommonModule, DecimalPipe} from "@angular/common";
import {AmountCalcContainerComponent} from "./amount-calc-container.component";

@NgModule({
  declarations: [AmountCalcContainerComponent],
  imports: [AmountCalcRoutingModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [FinAmountService, DecimalPipe]
})
export class AmountCalcModule {}
