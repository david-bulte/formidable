import { Component } from '@angular/core';

@Component({
  selector: 'formidable-root',
  template: `
    <div class="bg-gray-100 overflow-x-hidden h-screen flex flex-col formidable-build-page__container">
      <formidable-nav>
        <span brand>Formidable</span>
        <formidable-nav-link [path]="'build'">builder</formidable-nav-link>
        <div alignRight>
          <ng-container teleportOutlet="navButton"></ng-container>
        </div>
      </formidable-nav>

      <div class="overflow-y-hidden flex-1">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class AppComponent {}
