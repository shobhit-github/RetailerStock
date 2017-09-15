import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {SliderModule, InputMaskModule, ChartModule} from 'primeng/primeng';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// custom modules and routes
import {AuthModule} from './auth/auth.module';
import {HomeModule} from './home/home.module';
import {SharedModule} from './_shared/shared.module';
import {Routing} from './app.routes';




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
      Routing,
      SharedModule
  ],
  declarations: [
      AppComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
