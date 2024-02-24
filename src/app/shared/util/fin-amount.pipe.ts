import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  standalone: true,
  name: 'convertFinAmount',
})
export class ConvertFinAmountPipe implements PipeTransform {
  constructor(private readonly decimalPipe: DecimalPipe) {}

  transform(amount: string): string {
    let slicedAmount: number | undefined;
    let operator: string | undefined;

    if (isNaN(Number(amount.charAt(amount.length - 1)))) {
      slicedAmount = +amount.slice(0, amount.length - 1);
      operator = amount.slice(amount.length - 1).toLowerCase();
    }

    const multiplier: { [key: string]: number } = {
      k: 1000,
      m: 1000000,
      b: 1000000000,
      t: 1000000000000,
    };

    if (operator && operator in multiplier) {
      return this.decimalPipe.transform(
        slicedAmount * multiplier[operator],
        '1.0-0'
      );
    } else {
      return this.decimalPipe.transform(amount, '1.0-0');
    }
  }
}
