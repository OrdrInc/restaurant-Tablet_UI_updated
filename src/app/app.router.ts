import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TabletRestComponent } from './tablet-rest/tablet-rest';
import { LoginComponent } from './tablet-admin/login/login.component';
import { CrubsideComponent } from './tablet-rest/crubside/crubside.component';
export const urlRoutes: Routes = [
    {
        path: 'rest/:id',
        component: TabletRestComponent,
    },
    {
        path: 'crubside/:id',
        component: CrubsideComponent,
    },
    {
        path: 'admin/login',
        component: LoginComponent,
    },
    /*  {
          path: '**',
          //  component: NotfoundComponent
      },
      {
          path: '',
          // component: HomeComponent
      },*/

];

@NgModule({
    imports: [RouterModule.forChild(urlRoutes)],
    exports: [RouterModule],
    providers: []
})
export class UrlRoutes { }
