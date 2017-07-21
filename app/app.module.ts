import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {RegisterComponent, LoginComponent} from "./auth/index";
import {PageNotFoundComponent} from './elements/index';
import {SliderModule, InputMaskModule, ChartModule} from 'primeng/primeng';
import {Routing} from "./app.routes";
import {AuthenticationService} from "./_shared/_services/index";
import {CurrencyPipe, SymbolPipe} from './_shared/_pipes/index';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        SliderModule,
        InputMaskModule,
        ChartModule,
        Routing
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        RegisterComponent,
        LoginComponent,
        CurrencyPipe,
        SymbolPipe
    ],
    providers: [AuthenticationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}