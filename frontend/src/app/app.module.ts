import { AuthService } from './security/auth.service';
import { LoginComponent } from './security/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './routing/app.routes';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CookieModule, CookieService } from 'ngx-cookie';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CookieModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
