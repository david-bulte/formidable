import { Component } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faShapes } from '@fortawesome/free-solid-svg-icons/faShapes';

@Component({
  selector: 'formidable-root',
  template: `
    <div class="flex flex-row h-full">
      <nav class="flex-0 flex flex-col mx-6 pt-20">
        <formidable-sidenav-link [path]="'home'">
          <fa-icon [icon]="home"></fa-icon>
        </formidable-sidenav-link>
        <formidable-sidenav-link [path]="'build'">
          <fa-icon [icon]="shapes"></fa-icon>
        </formidable-sidenav-link>
      </nav>

      <div class="flex-1">
        <ng-container teleportOutlet="nav"></ng-container>
        <div class="border-l-8 border-t-8 border-green-200 rounded-tl-2xl">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {
  home = faHome;
  shapes = faShapes;
}
