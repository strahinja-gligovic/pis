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
import { WrapperComponent } from './pages/wrapper/wrapper.component';
import { SidebarComponent } from './util/sidebar/sidebar.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieComponent } from './pages/movies/movie/movie.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientComponent } from './pages/clients/client/client.component';
import { ClientService } from './pages/clients/client.service';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { SidebarService } from './util/sidebar/sidebar.service';
import { TitleComponent } from './util/title/title.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxResizeWatcherDirective } from './util/ngx-resize-watcher.directive';
import { MovieService } from './pages/movies/movie.service';
import { Ng2CompleterModule } from 'ng2-completer';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CopiesTotalsDirective } from './util/copies-totals.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    HomeComponent,
    WrapperComponent,
    SidebarComponent,
    MoviesComponent,
    MovieComponent,
    ClientsComponent,
    ClientComponent,
    TitleComponent,
    NgxResizeWatcherDirective,
    CopiesTotalsDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CookieModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxDatatableModule,
    NgSelectModule,
    Ng2CompleterModule,
    AlertModule.forRoot()
  ],
  entryComponents: [ClientComponent, MovieComponent],
  providers: [AuthService, CookieService, AuthGuard, ClientService, BsModalService, SidebarService,
    MovieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
