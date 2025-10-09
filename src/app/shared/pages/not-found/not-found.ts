import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.html',
})
export class NotFound {
  private readonly location = inject(Location);

  protected navigateBack(): void {
    this.location.back();
  }
}
