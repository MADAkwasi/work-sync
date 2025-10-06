import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
})
export class Button {
  public readonly type = input<'button' | 'submit'>('button');
  public readonly variant = input<'primary' | 'secondary' | 'tertiary'>('primary');
  public readonly disabled = input(false);
}
