import {AuthenticationService} from '../_shared/_services/index';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ForgotComponent} from './forgot/forgot.component';
import {ResetPasswordComponent} from './reset-passwod/reset-password.component';
import {AuthRouting} from './auth.routes';
import {SharedModule} from '../_shared/shared.module';
import {TranslationService} from '../_shared/_services/translation.service';




@NgModule({
    imports: [
        AuthRouting,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        RegisterComponent,
        LoginComponent,
        ForgotComponent,
        ResetPasswordComponent
    ],
    providers: [AuthenticationService, TranslationService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule {
}
