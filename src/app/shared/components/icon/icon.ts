import { Component, input, output } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-icon',
  imports: [Button],
  templateUrl: './icon.html',
})
export class Icon {
  public readonly icon = input.required<string>();
  public readonly size = input('1.5');
  public readonly onClick = output();
  public readonly isDisabled = input(false);
  public readonly customStyles = input('');

  protected handleClickEvent(): void {
    this.onClick.emit();
  }
}
