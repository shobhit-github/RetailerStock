import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent, InternalErrorComponent} from './elements/index';
import { AuthGuard } from './_shared/_guards/index';
import {HomeComponent, DashboardComponent} from './home/home.component';



const APP_ROUTER_PROVIDER: Routes = [

    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    },


    {
        path: '',
        redirectTo: '/home/dashboard',
        pathMatch: 'full'
    },

    {
        path: 'error_page',
        component: InternalErrorComponent
    },

    // otherwise redirect to 404
    {
        path: '**',
        component: PageNotFoundComponent
    }

];

export const Routing = RouterModule.forRoot(APP_ROUTER_PROVIDER);
