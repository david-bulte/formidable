import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'formidable-nav',
  template: `
    <nav class="bg-white px-6 py-4 z-10 shadow">
      <div class="flex flex-col container mx-auto">
        <div class="flex items-baseline">
          <div>
            <a href="#" class="text-gray-800 text-xl font-bold">
              <ng-content select="[brand]"></ng-content>
            </a>
          </div>
          <ng-content></ng-content>
        </div>
      </div>
    </nav>
  `,
  styles: [
  ]
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
