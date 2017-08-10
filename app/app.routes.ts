import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import {PageNotFoundComponent, InternalErrorComponent} from './elements/index';
import { AuthGuard } from './_shared/_guards/index';
import {HomeComponent, DashboardComponent} from "./home/home.component";




const APP_ROUTER_PROVIDERS: Routes = [

    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children:[
            {
                path:'dashboard',
                component: DashboardComponent,
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'auth',
        loadChildren: ()=> AuthModule
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
    // otherwise redirect to home
    {
        path: '**',
        component: PageNotFoundComponent
    }

];

export const Routing = RouterModule.forRoot(APP_ROUTER_PROVIDERS);