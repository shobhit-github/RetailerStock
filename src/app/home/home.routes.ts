import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home.component";
import {AuthGuard} from "../_shared/_guards/auth.guard";

const HOME_ROUTES_PROVIDER: Routes = [

    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: '../dashboard/dashboard.module#DashboardModule',
            },


            {
                path: '',
                redirectTo: '/home/dashboard',
                pathMatch: 'full'
            }
        ],
        canActivate: [AuthGuard]
    },



];


export const HomeRouting = RouterModule.forChild(HOME_ROUTES_PROVIDER);
