import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard.component';


const AUTH_ROUTER_PROVIDERS: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
  }

];

export const DashboardRouting = RouterModule.forChild(AUTH_ROUTER_PROVIDERS);
