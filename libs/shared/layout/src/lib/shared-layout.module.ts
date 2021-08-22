import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavComponent } from './nav/nav.component';
import { SidenavLinkComponent } from './nav-link/sidenav-link.component';
import { InlineEditComponent } from './inline-edit/inline-edit.component';
import { TabsContainerComponent } from './tabs/tabs-container/tabs-container.component';
import { TabComponent } from './tabs/tab/tab.component';
import { TabContentDirective } from './tabs/tab-content.directive';
import { TabTitleDirective } from './tabs/tab-title.directive';

@NgModule({
  imports: [CommonModule, RouterModule, FontAwesomeModule, ReactiveFormsModule],
  declarations: [
    NavComponent,
    SidenavLinkComponent,
    InlineEditComponent,
    TabsContainerComponent,
    TabComponent,
    TabContentDirective,
    TabTitleDirective,
  ],
  exports: [
    NavComponent,
    SidenavLinkComponent,
    InlineEditComponent,
    TabsContainerComponent,
    TabComponent,
    TabTitleDirective,
    TabContentDirective,
  ],
})
export class SharedLayoutModule {}
