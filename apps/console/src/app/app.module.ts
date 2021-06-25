import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import {
  BuildPageComponent,
  ConsoleBuilderModule,
} from '@formidable/console/builder';
import { SharedLayoutModule } from '@formidable/shared/layout';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedLayoutModule,
    ConsoleBuilderModule,
    RouterModule.forRoot([
      {
        path: 'build',
        component: BuildPageComponent,
      },
      {
        path: '',
        redirectTo: 'build',
        pathMatch: 'full',
      },
    ]),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
