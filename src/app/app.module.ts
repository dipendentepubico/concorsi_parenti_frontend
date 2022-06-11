import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {HomeComponent} from './components/core/home/home.component';
import {AuthorComponent} from './components/core/author/author.component';
import {AboutComponent} from './components/core/about/about.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EnteListComponent} from './components/ente/ente-list/ente-list.component';
import {ParenteListComponent} from './components/ente/parente-list/parente-list.component';
import {ConcorsoListComponent} from './components/concorso/concorso-list/concorso-list.component';
import {ConcorsoDettaglioComponent} from './components/concorso/concorso-dettaglio/concorso-dettaglio.component';
import {ConcorsoParentiComponent} from './components/concorso/concorso-parenti/concorso-parenti.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ConcorsoGraduatoriaComponent} from './components/concorso/concorso-graduatoria/concorso-graduatoria.component';
import {
  ConcorsoIdoneoParentiComponent
} from './components/concorso/concorso-idoneo-parenti/concorso-idoneo-parenti.component';
import {MatTableFilterModule} from 'mat-table-filter';
import {EnteEditComponent} from './components/ente/ente-edit/ente-edit.component';
import {MessageComponent} from './components/messages/message.component';
import {DipendenteListComponent} from './components/dipendente/dipendente-list/dipendente-list.component';
import {DipendenteEditComponent} from './components/dipendente/dipendente-edit/dipendente-edit.component';
import {JsonDateInterceptor} from './interceptors/json-date.interceptor';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CaptchaComponent} from './components/captcha/captcha.component';
import {RegisterComponent} from './auth/components/register/register.component';
import {ProfileComponent} from './auth/components/profile/profile.component';
import {LoginComponent} from './auth/components/login/login.component';
import {AuthInterceptor} from './auth/interceptors/auth.interceptor';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {RxStompService} from './websocket/services/rx-stomp.service';
import {rxStompServiceFactory} from './websocket/services/rx-stomp-service-factory';
import { WebSocketComponent } from './websocket/components/web-socket/web-socket.component';
import {TokenStorageService} from './auth/services/token-storage.service';
import { UserRoleDirective } from './user-role.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthorComponent,
    AboutComponent,
    EnteListComponent,
    ParenteListComponent,
    ConcorsoListComponent,
    ConcorsoDettaglioComponent,
    ConcorsoParentiComponent,
    ConcorsoGraduatoriaComponent,
    ConcorsoIdoneoParentiComponent,
    EnteEditComponent,
    MessageComponent,
    DipendenteListComponent,
    DipendenteEditComponent,
    CaptchaComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,
    FileUploadComponent,
    WebSocketComponent,
    UserRoleDirective,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatExpansionModule,
        MatToolbarModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDatepickerModule,
        MatSelectModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        MatTooltipModule,
        MatTableFilterModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatProgressBarModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [{provide: HTTP_INTERCEPTORS, useClass: JsonDateInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: RxStompService, useFactory: rxStompServiceFactory, deps: [TokenStorageService]    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
