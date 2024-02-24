import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {FinAmountService} from "../services/fin-amount.service";
import {inject} from "@angular/core";

export const inputGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(FinAmountService).getFinAmount()
    ? true
    : inject(Router).createUrlTree(['/amount-input']);
};
