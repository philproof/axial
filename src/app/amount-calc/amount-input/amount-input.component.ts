import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FinAmountService } from '../../services/fin-amount.service';
import { CustomAmountDecimalValidator } from '../../shared';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amount-input',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss'],
})
export class AmountInputComponent implements OnInit {
  finAmountService = inject(FinAmountService);
  activateRoute = inject(ActivatedRoute);
  router = inject(Router);

  amount = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?:(?:\d*\.)?\d+)(?:[kmbtKMBT])?$/),
    CustomAmountDecimalValidator,
  ]);

  ngOnInit() {
    if (this.finAmountService.getFinAmount()) {
      this.amount.setValue(this.finAmountService.finAmount());
    }
  }

  onSubmit(): void {
    this.finAmountService.setFinAmount(this.amount.value);
    this.router.navigate(['../amount-display'], {
      relativeTo: this.activateRoute,
    });
  }

  handleClear(): void {
    this.amount.setValue('');
  }
}
