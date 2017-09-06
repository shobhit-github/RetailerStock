import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard.component';


const AUTH_ROUTER_PROVIDERS: Routes = [

  {
    path: 'overview',
    component: DashboardComponent,
  },

  {
    path: 'edit-account',
    component: DashboardComponent,
  },

  {
    path: 'projects',
    component: DashboardComponent,
  },

  {
    path: 'change-password',
    component: DashboardComponent,
  }

];

export const ProfileRouting = RouterModule.forChild(AUTH_ROUTER_PROVIDERS);
