import { DecimalPipe } from '@angular/common';
import { ConvertFinAmountPipe } from './fin-amount.pipe';

describe('ConvertFinAmountPipe', () => {
  const pipe = new ConvertFinAmountPipe(new DecimalPipe('en-US'));

  it('should convert to thousands', () => {
    expect(pipe.transform('1k')).toEqual('1,000');
    expect(pipe.transform('1.5k')).toEqual('1,500');
  });

  it('should convert to millions', () => {
    expect(pipe.transform('1m')).toEqual('1,000,000');
    expect(pipe.transform('1.25m')).toEqual('1,250,000');
  });

  it('should convert to billions', () => {
    expect(pipe.transform('1b')).toEqual('1,000,000,000');
    expect(pipe.transform('1.5b')).toEqual('1,500,000,000');
  });

  it('should convert to trillions', () => {
    expect(pipe.transform('1t')).toEqual('1,000,000,000,000');
    expect(pipe.transform('1.5t')).toEqual('1,500,000,000,000');
  });

  it('should print a number if no operator was passed in', () => {
    expect(pipe.transform('140')).toEqual('140');
  });
});
