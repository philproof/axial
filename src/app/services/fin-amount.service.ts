import {Injectable, Signal, signal, WritableSignal} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class FinAmountService {

  finAmount: WritableSignal<string> = signal('');

  public setFinAmount(amount: string): void {
    this.finAmount.set(amount);
  }

  public getFinAmount(): string {
    return this.finAmount();
  }
}
