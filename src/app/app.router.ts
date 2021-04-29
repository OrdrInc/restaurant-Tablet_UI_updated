import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TabletRestComponent } from './tablet-rest/tablet-rest';
import { LoginComponent } from './tablet-admin/login/login.component';
import { CrubsideComponent } from './tablet-rest/crubside/crubside.component';
import { FeedbackComponent } from './tablet-rest/feedback/feedback.component';
import { BroadcastComponent } from './tablet-rest/broadcast/broadcast.component';
import { StoreManageComponent } from './tablet-rest/store-manage/store-manage.component';
export const urlRoutes: Routes = [
    {
        path: 'rest/:id',
        component: TabletRestComponent,
    },
    {
        path: 'curbside/:id',
        component: CrubsideComponent,
    },
    {
        path: 'fb/:id',
        component: FeedbackComponent,
    },
    {
        path: 'broadcast/:id',
        component: BroadcastComponent,
    },
    {
        path: 'manage/:id',
        component: StoreManageComponent,
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
