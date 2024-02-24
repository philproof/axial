import { AbstractControl } from '@angular/forms';

const allowedLetters: string = 'kmbt';

export function CustomAmountDecimalValidator(control: AbstractControl) {
  const value: string = control.value.toLowerCase();
  if (
    control.value.startsWith('.') &&
    !allowedLetters.includes(value.charAt(value.length - 1))
  ) {
    return { validAmount: true };
  }
  return null;
}
