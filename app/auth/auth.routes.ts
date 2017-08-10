import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "../_shared/_guards/auth.guard";

import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {ForgotComponent} from "./forgot/forgot.component";
import {ResetPasswordComponent} from "./reset-passwod/reset-password.component";



const AUTH_ROUTER_PROVIDERS: Routes = [

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
    }

];

export const AuthRouting = RouterModule.forChild(AUTH_ROUTER_PROVIDERS);