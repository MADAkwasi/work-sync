import { Component, computed, input, output, signal } from '@angular/core';
import { Icon } from '../icon/icon';
import { Button } from '../button/button';

@Component({
  selector: 'app-pagination',
  imports: [Icon, Button],
  templateUrl: './pagination.html',
})
export class Pagination {
  protected readonly currentPage = signal(1);
  public readonly totalRecords = input.required<number>();
  public readonly amountOnDisplay = input(5);
  public readonly numOfPages = computed(() =>
    Math.ceil(this.totalRecords() / this.amountOnDisplay())
  );
  readonly pageChanged = output<number>();
  readonly pagesIndicator = computed(() => {
    const total = this.numOfPages();
    const current = this.currentPage();
    const pages = Array.from({ length: total }, (_, i) => i + 1);

    if (total <= 3) return pages;

    if (current === 1) return pages.slice(0, 3);

    if (current === total) return pages.slice(-3);

    return [current - 1, current, current + 1];
  });

  protected nextPage(): void {
    if (this.currentPage() < this.numOfPages()) {
      this.currentPage.update((p) => p + 1);
      this.pageChanged.emit(this.currentPage());
    }
  }

  protected prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
      this.pageChanged.emit(this.currentPage());
    }
  }

  protected goToPage(page: number | string): void {
    if (typeof page !== 'number' || page === this.currentPage()) return;
    this.currentPage.set(page);
    this.pageChanged.emit(page);
  }
}
