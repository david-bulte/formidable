import { Component } from '@angular/core';

@Component({
  selector: 'formidable-nav',
  template: `
    <nav class="bg-white px-6 py-4 z-10 shadow">
      <div class="flex flex-col mx-auto">
        <div class="flex items-baseline">
          <div>
            <a href="#" class="text-gray-800 text-xl font-bold">
              <ng-content select="[brand]"></ng-content>
            </a>
          </div>
          <ng-content></ng-content>
          <div class="ml-auto">
            <ng-content select="[alignRight]"></ng-content>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [],
})
export class NavComponent {
}
