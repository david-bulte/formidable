import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { NavLinkComponent } from './nav-link/nav-link.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [
        NavComponent,
        NavLinkComponent
    ],
    exports: [NavComponent, NavLinkComponent]
})
export class SharedLayoutModule {
}
