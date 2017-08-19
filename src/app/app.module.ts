import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {
  PageNotFoundComponent,
  InternalErrorComponent,
  AsideComponent,
  SidebarComponent,
  HeaderComponent,
  SettingComponent
} from './elements/index';
import {SliderModule, InputMaskModule, ChartModule} from 'primeng/primeng';
import {Routing} from './app.routes';
import {CurrencyPipe, SymbolPipe} from './_shared/_pipes/index';
import {AuthGuard} from './_shared/_guards/index';
import {HttpModule} from '@angular/http';
import {HomeComponent, DashboardComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {AuthModule} from './auth/auth.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SliderModule,
    HttpModule,
    AuthModule,
    InputMaskModule,
    ChartModule,
    Routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    PageNotFoundComponent,
    InternalErrorComponent,
    HeaderComponent,
    AsideComponent,
    SidebarComponent,
    SettingComponent,
    CurrencyPipe,
    SymbolPipe
  ],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
