import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-avatar',
  imports: [AvatarModule, CommonModule],
  templateUrl: './avatar.html',
})
export class Avatar {
  public readonly image = input<undefined | string>(undefined);
  public readonly userInitials = input<undefined | string>(undefined);
}
