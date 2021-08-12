import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import {
  BuildPageComponent,
  ConsoleBuilderModule, EmptyStateComponent, ProjectComponent
} from '@formidable/console/builder';
import { SharedLayoutModule } from '@formidable/shared/layout';
import {
  popperVariation,
  TippyModule,
  tooltipVariation,
} from '@ngneat/helipopper';
import { TeleportModule } from '@ngneat/overview';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    SharedLayoutModule,
    ConsoleBuilderModule,
    RouterModule.forRoot([
      {
        path: 'build',
        component: BuildPageComponent,
        children: [
          {
            path: ':id',
            component: ProjectComponent
          },
          {
            path: '',
            component: EmptyStateComponent
          }
        ]
      },
      {
        path: '',
        redirectTo: 'build',
        pathMatch: 'full',
      },
    ]),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    // todo make this more modular
    TippyModule.forRoot({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
      },
    }),
    TeleportModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
