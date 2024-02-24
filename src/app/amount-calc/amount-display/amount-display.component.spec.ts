import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmountDisplayComponent } from './amount-display.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FinAmountService } from '../../services/fin-amount.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DecimalPipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('amount display component', () => {
  let component: AmountDisplayComponent;
  let fixture: ComponentFixture<AmountDisplayComponent>;
  let service: FinAmountService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AmountDisplayComponent, RouterTestingModule.withRoutes([])],
      providers: [
        Router,
        FinAmountService,
        DecimalPipe,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              parent: {
                routeConfig: {
                  path: 'some-route',
                },
              },
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(AmountDisplayComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(FinAmountService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the appropriate label', () => {
    const labelElem: DebugElement = fixture.debugElement.query(
      By.css('.display__label')
    );
    expect(labelElem.nativeElement.textContent).toContain('Your formatted');
  });

  it('should display the appropriate dollar amount', () => {
    spyOn(service, 'getFinAmount').and.returnValue('1k');
    fixture.detectChanges();
    const amountElem: DebugElement = fixture.debugElement.query(
      By.css('.display__valid-amount')
    );
    expect(amountElem).toBeTruthy();
    expect(amountElem.nativeElement.textContent.trim()).toBe('$ 1,000');
  });

  it('should route when the button is clicked', () => {
    const buttonElem: DebugElement = fixture.debugElement.query(
      By.css('.display__button')
    );
    expect(buttonElem).toBeTruthy();
    spyOn(router, 'navigate');
    buttonElem.triggerEventHandler('click');
    expect(router.navigate).toHaveBeenCalledWith(['../amount-input'], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });
});
