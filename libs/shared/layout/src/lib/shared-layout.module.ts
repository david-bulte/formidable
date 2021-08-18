import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavComponent } from './nav/nav.component';
import { NavLinkComponent } from './nav-link/nav-link.component';
import { InlineEditComponent } from './inline-edit/inline-edit.component';

@NgModule({
  imports: [CommonModule, RouterModule, FontAwesomeModule, ReactiveFormsModule],
  declarations: [NavComponent, NavLinkComponent, InlineEditComponent],
  exports: [NavComponent, NavLinkComponent, InlineEditComponent],
})
export class SharedLayoutModule {}
