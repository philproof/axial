import { FormControl } from '@angular/forms';
import { CustomAmountDecimalValidator } from './custom-amount.validator';

describe('custom amount validator', () => {
  it('should successfully valide if a decimal is used with an operator', () => {
    expect(CustomAmountDecimalValidator(new FormControl('.5k'))).toEqual(null);
  });

  it('should fail validation of a decimal was used without an operator', () => {
    expect(CustomAmountDecimalValidator(new FormControl('.5'))).toEqual({
      validAmount: true,
    });
  });
});
