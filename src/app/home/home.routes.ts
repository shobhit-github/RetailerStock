import { Routes, RouterModule } from '@angular/router';


const AUTH_ROUTER_PROVIDERS: Routes = [

  {
    path: 'dashboard',
    loadChildren: '../dashboard/dashboard.module#DashboardModule',
  }



];

export const HomeRouting = RouterModule.forChild(AUTH_ROUTER_PROVIDERS);
