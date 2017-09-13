import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent, InternalErrorComponent} from './elements/index';
import {AuthModule} from './auth/auth.module';
import {HomeModule} from './home/home.module';

// have to be export modules to handle the lazy loading routing
export function loadAuthModule() { return AuthModule; }
export function loadHomeModule() { return HomeModule; }


const APP_ROUTER_PROVIDER: Routes = [

    {
        path: 'home',
        loadChildren: loadHomeModule
    },
    {
        path: 'auth',
        loadChildren: loadAuthModule
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

export const Routing = RouterModule.forRoot(APP_ROUTER_PROVIDER, { enableTracing: false });
