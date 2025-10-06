import { Component, input } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-icon',
  imports: [Button],
  templateUrl: './icon.html',
})
export class Icon {
  public readonly icon = input('');
  public readonly size = input('1.7');
}
