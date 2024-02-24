import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AmountInputComponent } from "./amount-input.component";
import { FinAmountService } from "../../services/fin-amount.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

describe("amount input component", () => {
  let component: AmountInputComponent;
  let fixture: ComponentFixture<AmountInputComponent>;
  let service: FinAmountService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AmountInputComponent,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        FinAmountService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              parent: {
                routeConfig: {
                  path: "some-route",
                },
              },
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(AmountInputComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(FinAmountService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should update the amount form value when an input is made", () => {
    const inputElem: DebugElement = fixture.debugElement.query(
      By.css("#amount")
    );
    inputElem.nativeElement.value = "1k";
    inputElem.nativeElement.dispatchEvent(new Event("input"));
    expect(component.amount.value).toBe("1k");
  });

  it("should submit the form when the button is clicked", () => {
    const inputElem: DebugElement = fixture.debugElement.query(
      By.css("#amount")
    );
    const formElem: DebugElement = fixture.debugElement.query(By.css("form"));
    spyOn(service, "setFinAmount");
    spyOn(router, "navigate");
    inputElem.nativeElement.value = "1k";
    inputElem.nativeElement.dispatchEvent(new Event("input"));
    formElem.triggerEventHandler("submit");
    expect(service.setFinAmount).toHaveBeenCalledWith("1k");
    expect(router.navigate).toHaveBeenCalledWith(["../amount-display"], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });

  it("should clear the input when the clear button is clicked", () => {
    const clearElem: DebugElement = fixture.debugElement.query(
      By.css(".home__clear")
    );
    const inputElem: DebugElement = fixture.debugElement.query(
      By.css("#amount")
    );
    spyOn(component, "handleClear").and.callThrough();
    inputElem.nativeElement.value = "1k";
    inputElem.nativeElement.dispatchEvent(new Event("input"));
    expect(component.amount.value).toBe("1k");

    clearElem.triggerEventHandler("click");
    expect(component.handleClear).toHaveBeenCalled();
    expect(inputElem.nativeElement.value).toBe("");
    expect(component.amount.value).toBe("");
  });

  it("should display the required validation error", () => {
    const inputElem: DebugElement = fixture.debugElement.query(
      By.css("#amount")
    );
    const required: DebugElement = fixture.debugElement.query(
      By.css(".home__input-info")
    );
    expect(component.amount.valid).toBe(false);
    expect(required).toBeTruthy();
  });

  it("should display the pattern validation error", () => {
    const inputElem: DebugElement = fixture.debugElement.query(
      By.css("#amount")
    );
    inputElem.nativeElement.value = "1W";
    inputElem.nativeElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.amount.value).toBe("1W");
    expect(component.amount.valid).toBe(false);

    const patternError: DebugElement = fixture.debugElement.query(
      By.css(".home__form-error")
    );

    expect(patternError).toBeTruthy();
    expect(patternError.nativeElement.textContent).toContain("Please enter");
  });

  it("should display the decimal validation error", () => {
    const inputElem: DebugElement = fixture.debugElement.query(
      By.css("#amount")
    );
    inputElem.nativeElement.value = ".1";
    inputElem.nativeElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.amount.value).toBe(".1");
    expect(component.amount.valid).toBe(false);

    const patternError: DebugElement = fixture.debugElement.query(
      By.css(".home__form-error")
    );

    expect(patternError).toBeTruthy();
    expect(patternError.nativeElement.textContent).toContain("Using a decimal");
  });
});
