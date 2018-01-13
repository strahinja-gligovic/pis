import { AuthGuard } from './routing/auth.guard';
import { AuthService } from './security/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './routing/app.routes';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CookieModule, CookieService } from 'ngx-cookie';
import { LoginComponent } from './security/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './security/register/register.component';
import { PageNotFoundComponent } from './util/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CookieModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, CookieService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
