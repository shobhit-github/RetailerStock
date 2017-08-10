import {AuthenticationService} from "../_shared/_services/index";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {ForgotComponent} from "./forgot/forgot.component";
import {ResetPasswordComponent} from "./reset-passwod/reset-password.component";
import {AuthRouting} from "./auth.routes";


@NgModule({
    imports: [
        AuthRouting,
        FormsModule,
        CommonModule
    ],
    declarations: [
        RegisterComponent,
        LoginComponent,
        ForgotComponent,
        ResetPasswordComponent
    ],
    providers: [AuthenticationService]
})
export class AuthModule {
}