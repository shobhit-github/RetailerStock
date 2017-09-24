import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard.component';



const DASHBOARD_ROUTER_PROVIDERS: Routes = [

    {
        path: '',
        component: DashboardComponent,
        children: [

            {
              path: '',
              redirectTo: '/home/dashboard',
              pathMatch: 'full'
            }
        ]
    },


];

export const DashboardRouting = RouterModule.forChild(DASHBOARD_ROUTER_PROVIDERS);
