import { Component } from '@angular/core';

@Component({
  selector: 'formidable-nav',
  template: `
    <nav class="bg-white px-6 py-4 z-10">
      <div class="flex flex-col mx-auto">
        <div class="flex items-baseline">
          <div>
            <a href="#" class="text-gray-800 text-xl font-bold ml-4">
              <ng-content select="[title]"></ng-content>
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
})
export class NavComponent {}
