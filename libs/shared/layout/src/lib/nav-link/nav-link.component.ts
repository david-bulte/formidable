import { Component, Input } from '@angular/core';

@Component({
  selector: 'formidable-nav-link',
  template: `
    <div class="mx-6">
      <a href [routerLink]="path" class="text-blue-500 hover:underline">
        <ng-content></ng-content>
      </a>
    </div>
  `,
  styles: [],
})
export class NavLinkComponent {
  @Input() path: string = undefined;
}
