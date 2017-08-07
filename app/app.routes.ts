import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, RegisterComponent, ForgotComponent, ResetPasswordComponent } from './auth/index';
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
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgot',
        component: ForgotComponent
    },
    {
        path: 'reset-pass/:id',
        component: ResetPasswordComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },



    {
        path: '',
        redirectTo: '/home/dashboard',
        pathMatch: 'full'
    },

    // otherwise redirect to home
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