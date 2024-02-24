import { Component, inject } from '@angular/core';
import { FinAmountService } from '../../services/fin-amount.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConvertFinAmountPipe } from '../../shared/util';

@Component({
  selector: 'app-amount-calc',
  standalone: true,
  imports: [CommonModule, RouterModule, ConvertFinAmountPipe],
  templateUrl: './amount-display.component.html',
  styleUrls: ['./amount-display.component.scss'],
})
export class AmountDisplayComponent {
  activateRoute = inject(ActivatedRoute);
  router = inject(Router);
  finAmountService = inject(FinAmountService);

  handleBackClick(): void {
    this.router.navigate(['../amount-input'], {
      relativeTo: this.activateRoute,
    });
  }
}
