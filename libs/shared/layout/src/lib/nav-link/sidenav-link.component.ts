import { Component, Input } from '@angular/core';

@Component({
  selector: 'formidable-sidenav-link',
  template: `
    <div class="mb-5">
      <a
        href
        [routerLink]="path"
        class="hover:text-green-200"
        [routerLinkActive]="'text-green-200'"
      >
        <ng-content></ng-content>
      </a>
    </div>
  `,
})
export class SidenavLinkComponent {
  @Input() path?: string = undefined;
}
