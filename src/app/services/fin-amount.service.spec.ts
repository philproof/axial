import { FinAmountService } from './fin-amount.service';

describe('fin-amount service', () => {
  let service: FinAmountService = new FinAmountService();

  it('should set the finAmount', () => {
    service.setFinAmount('1k');
    expect(service.finAmount()).toEqual('1k');
  });

  it('should get the finAmount', () => {
    service.finAmount.set('1k');
    expect(service.getFinAmount()).toEqual('1k');
  });
});
