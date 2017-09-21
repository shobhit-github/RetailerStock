import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {AuthGuard} from '../_shared/_guards/auth.guard';
import {DashboardModule} from './dashboard/dashboard.module';
import {ProfileModule} from './profile/profile.module';
import {PageNotFoundComponent} from '../elements/not-found.component';

// have to be export modules to handle the lazy loading routing
export function loadDashboardModule() { return DashboardModule; }
export function loadProfileModule() { return ProfileModule; }



const HOME_ROUTES_PROVIDER: Routes = [

    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: loadDashboardModule
            },

            {
                path: 'profile',
                loadChildren: loadProfileModule
            },


            {
                path: '',
                redirectTo: '/home/dashboard',
                pathMatch: 'full'
            }
        ],
        canActivate: [AuthGuard]
    },


    // otherwise redirect to 404
    {
        path: '**',
        component: PageNotFoundComponent
    },


];


export const HomeRouting = RouterModule.forChild(HOME_ROUTES_PROVIDER);
