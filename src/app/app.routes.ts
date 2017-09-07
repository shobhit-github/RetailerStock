import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent, InternalErrorComponent} from './elements/index';
import { AuthGuard } from './_shared/_guards/index';



const APP_ROUTER_PROVIDER: Routes = [

    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    },


    {
        path: '',
        redirectTo: '/home',
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
