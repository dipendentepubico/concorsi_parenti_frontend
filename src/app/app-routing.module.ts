import { HomeComponent } from './components/core/home/home.component';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EnteListComponent} from './components/ente/ente-list/ente-list.component';
import {ParenteListComponent} from './components/ente/parente-list/parente-list.component';
import {ConcorsoListComponent} from './components/concorso/concorso-list/concorso-list.component';
import {ConcorsoDettaglioComponent} from './components/concorso/concorso-dettaglio/concorso-dettaglio.component';
import {EnteEditComponent} from './components/ente/ente-edit/ente-edit.component';
import {LoginComponent} from './auth/components/login/login.component';
import {RegisterComponent} from './auth/components/register/register.component';
import {ProfileComponent} from './auth/components/profile/profile.component';


const Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'ente/ente-list', component: EnteListComponent},
  { path: 'ente/ente-edit/:id', component: EnteEditComponent},
  { path: 'ente/ente-create', component: EnteEditComponent},
  { path: 'ente/ente-parenti/:id', component: ParenteListComponent},
  { path: 'concorso/concorso-list', component: ConcorsoListComponent},
  { path: 'concorso/:id/dettaglio', component: ConcorsoDettaglioComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
