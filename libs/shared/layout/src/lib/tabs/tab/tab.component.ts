import {
  AfterViewInit,
  Component,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { TabContentDirective } from '../tab-content.directive';
import { TabTitleDirective } from '../tab-title.directive';

@Component({
  selector: 'formidable-tab',
  template: '<ng-content></ng-content>',
})
export class TabComponent implements AfterViewInit {
  @ContentChild(TabTitleDirective, { read: TemplateRef })
  title!: TemplateRef<any>;
  @ContentChild(TabContentDirective, { read: TemplateRef })
  content!: TemplateRef<any>;

  ngAfterViewInit(): void {
    console.log('this.title', this.title);
  }
}
