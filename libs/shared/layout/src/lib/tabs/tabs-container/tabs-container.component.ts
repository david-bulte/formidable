import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'formidable-tabs',
  template: `
    <div class="flex flex-col" style="overflow-y: hidden">
      <div class="flex flex-row justify-end">
        <h1
          class="title ml-1 cursor-pointer hover:bg-green-300"
          [class.active]="index === activeTab"
          *ngFor="let title of titles; let index = index"
          (click)="onSetActiveTab(index)"
        >
          <ng-container *ngTemplateOutlet="title"></ng-container>
        </h1>
      </div>
      <div class="card h-full overflow-y-auto">
        <ng-container *ngTemplateOutlet="tabContent"></ng-container>
      </div>
    </div>
  `,
  styles: [
    `
        :host {
            display: flex;
            flex-direction: column;
            overflow-y: hidden;
        }
    `
  ],
})
export class TabsContainerComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  titles: TemplateRef<any>[] = [];
  activeTab = 0;
  tabContent: TemplateRef<any> | undefined;

  ngAfterContentInit(): void {
    this.titles = this.tabs.map((tab) => tab.title);
    this.tabContent = this.tabs.get(0)?.content;
  }

  onSetActiveTab(index: number) {
    this.activeTab = index;
    this.tabContent = this.tabs.get(index)?.content;
  }
}
