import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './app/app-routes';
import { InjectSessionInterceptor } from '@core/interceptors/inject-session.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { provideHttpClient, withFetch, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
      provideRouter(appRoutes),
      importProvidersFrom(BrowserModule, FormsModule, ReactiveFormsModule),
      provideClientHydration(),
      provideHttpClient(withFetch()),
      CookieService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: InjectSessionInterceptor,
          multi: true
      },
      provideHttpClient(withInterceptorsFromDi())
  ]
})
  .catch((err) => console.error(err));
