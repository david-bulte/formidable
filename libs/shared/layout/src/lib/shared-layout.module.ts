import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavComponent } from './nav/nav.component';
import { SidenavLinkComponent } from './nav-link/sidenav-link.component';
import { InlineEditComponent } from './inline-edit/inline-edit.component';

@NgModule({
  imports: [CommonModule, RouterModule, FontAwesomeModule, ReactiveFormsModule],
  declarations: [NavComponent, SidenavLinkComponent, InlineEditComponent],
  exports: [NavComponent, SidenavLinkComponent, InlineEditComponent],
})
export class SharedLayoutModule {}
