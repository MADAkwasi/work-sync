import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonTypes, ButtonVariants } from '../../models/button';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
})
export class Button {
  public readonly type = input<ButtonTypes>('button');
  public readonly variant = input<ButtonVariants>('primary');
  public readonly disabled = input(false);
  public readonly fullWidth = input(false);
  public readonly onClick = output();

  protected hanldeClickEvent(): void {
    this.onClick.emit();
  }
}
