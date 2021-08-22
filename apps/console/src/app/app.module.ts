import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { persistState } from '@datorama/akita';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import {
  BuildPageComponent,
  ConsoleBuilderModule,
  EmptyStateComponent,
  ProjectComponent,
} from '@formidable/console/builder';
import { SharedLayoutModule } from '@formidable/shared/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
            component: ProjectComponent,
          },
          {
            path: '',
            component: EmptyStateComponent,
          },
        ],
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
    FontAwesomeModule,
  ],
  providers: [{ provide: 'persistStorage', useValue: persistState() }],
  bootstrap: [AppComponent],
})
export class AppModule {}
