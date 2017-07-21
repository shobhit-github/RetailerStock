import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, RegisterComponent } from './auth/index';
import {PageNotFoundComponent} from '#elements/';
import { AuthGuard } from '#guards/';



const APP_ROUTER_PROVIDERS: Routes = [

    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },



    // otherwise redirect to home
    {
        path: '**',
        component: PageNotFoundComponent
    }

];

export const Routing = RouterModule.forRoot(APP_ROUTER_PROVIDERS);