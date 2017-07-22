import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {RegisterComponent, LoginComponent, ForgotComponent} from "./auth/index";
import {PageNotFoundComponent, AsideComponent, SidebarComponent, HeaderComponent, SettingComponent} from './elements/index';
import {SliderModule, InputMaskModule, ChartModule} from 'primeng/primeng';
import {Routing} from "./app.routes";
import {AuthenticationService} from "./_shared/_services/index";
import {CurrencyPipe, SymbolPipe} from './_shared/_pipes/index';
import {AuthGuard} from "./_shared/_guards/index";
import {HttpModule} from "@angular/http";
import {HomeComponent, DashboardComponent} from "./home/home.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        SliderModule,
        HttpModule,
        InputMaskModule,
        ChartModule,
        Routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        DashboardComponent,
        PageNotFoundComponent,
        HeaderComponent,
        AsideComponent,
        SidebarComponent,
        SettingComponent,
        RegisterComponent,
        LoginComponent,
        ForgotComponent,
        CurrencyPipe,
        SymbolPipe
    ],
    providers: [AuthenticationService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}