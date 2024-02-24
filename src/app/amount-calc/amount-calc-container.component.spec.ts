import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmountCalcContainerComponent } from './amount-calc-container.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('amount calc container', () => {
  let component: AmountCalcContainerComponent;
  let fixture: ComponentFixture<AmountCalcContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmountCalcContainerComponent],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(AmountCalcContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
