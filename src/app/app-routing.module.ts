import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './error-404/error-404.component';
import { EventInfoComponent } from './eventos/evento-info.component';
import { EventListComponent } from './eventos/evento-list.component';
import { EventoRelatorioComponent } from './eventos/evento-relatorio.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'events',
    component: EventListComponent
  },
  {
    path: 'events/acessar/:id',
    component: EventInfoComponent
  },
  {
    path: 'events/acessar/:id/relatorio',
    component: EventoRelatorioComponent
  },
  {
    path: '**',
    component: Error404Component
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
