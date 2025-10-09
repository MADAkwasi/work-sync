import { Component, inject, signal } from '@angular/core';
import { endpoints } from '@shared/constants/endpoints';
import { Header } from '@shared/components/header/header';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Button } from '@shared/components/button/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeaveDurationPipe } from '@core/pipes/leave-duration/leave-duration';
import { Router } from '@angular/router';
import { LeaveService } from '@core/services/leave/leave';
import { toastNotifications } from '@shared/constants/toast';
import { ToastService } from '@core/services/toast/toast';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-leave-request',
  imports: [
    Header,
    FloatLabelModule,
    DatePickerModule,
    InputTextModule,
    TextareaModule,
    Button,
    ReactiveFormsModule,
  ],
  templateUrl: './leave-request.html',
})
export class LeaveRequest {
  private readonly router = inject(Router);
  private readonly leaveService = inject(LeaveService);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly leaveDurationPipe = new LeaveDurationPipe();
  private readonly endpoint = endpoints.pages;
  protected readonly minDate = new Date();
  protected readonly isSubmitting = signal(false);
  protected readonly requestForm = this.fb.group({
    endDate: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    duration: [{ value: 0, disabled: true }],
    reason: [''],
  });

  ngOnInit(): void {
    this.setupAutoDurationCalculation();
  }

  private setupAutoDurationCalculation(): void {
    this.requestForm.get('startDate')?.valueChanges.subscribe(() => this.updateDuration());
    this.requestForm.get('endDate')?.valueChanges.subscribe(() => this.updateDuration());
  }

  private updateDuration(): void {
    const startDate = this.requestForm.get('startDate')?.value;
    const endDate = this.requestForm.get('endDate')?.value;

    if (startDate && endDate) {
      const duration = this.leaveDurationPipe.transform(startDate, endDate);
      this.requestForm.get('duration')?.setValue(duration, { emitEvent: false });
    } else {
      this.requestForm.get('duration')?.setValue(0, { emitEvent: false });
    }
  }

  protected handleNavigateBack(): void {
    this.router.navigate([this.endpoint.employeeDashboard]);
  }

  protected formatDate(date: string): string {
    const newDate = new Date(date);
    const formatted = newDate.toISOString().split('T')[0];
    return formatted;
  }

  protected onSubmit(): void {
    if (this.requestForm.invalid) return;

    const { reason, startDate, endDate } = this.requestForm.value;

    if (!startDate || !endDate) return;

    this.isSubmitting.set(true);
    const { operations, status } = toastNotifications;

    this.leaveService
      .createLeaveRequest({
        reason: reason ?? '',
        startDate: this.formatDate(startDate),
        endDate: this.formatDate(endDate),
      })
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.toast.show(operations.createSuccess, status.success);
          this.requestForm.reset();
        },
        error: ({ error }) => this.toast.show(operations.actionFailed, status.error, error.message),
      });
  }
}
