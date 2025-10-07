import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { errorMessages } from '@shared/constants/errors';

@Pipe({
  name: 'errorMessage',
  standalone: true,
  pure: false,
})
export class ErrorMessagePipe implements PipeTransform {
  transform(form: FormGroup, field: string): string | undefined {
    const element = form.get(field);
    if (!element?.touched) return;

    const errors: ValidationErrors | null = element.errors;
    if (!errors) return;

    if (errors['required']) return errorMessages.required;
    if (errors['minlength']) return errorMessages.minLength(3);

    return undefined;
  }
}
