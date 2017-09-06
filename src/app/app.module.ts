import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {SliderModule, InputMaskModule, ChartModule} from 'primeng/primeng';
import {Routing} from './app.routes';
import {CurrencyPipe, SymbolPipe} from './_shared/_pipes';
import {AuthGuard} from './_shared/_guards';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AuthModule} from './auth/auth.module';
import {HomeModule} from './home/home.module';
import {WindowRef} from './_shared/_helpers/window.ref';
import {EmitterService} from './_shared/_helpers/emitter.services';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SliderModule,
    HttpModule,
    AuthModule,
    HomeModule,
    InputMaskModule,
    ChartModule,
    Routing
  ],
  declarations: [
    AppComponent,
    CurrencyPipe,
    SymbolPipe
  ],
  providers: [AuthGuard, WindowRef, EmitterService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
