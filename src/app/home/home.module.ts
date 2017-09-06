import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRouting} from './home.routes';
import {DashboardModule} from '../dashboard/dashboard.module';
import {PageNotFoundComponent, InternalErrorComponent, AsideComponent, SidebarComponent, HeaderComponent, SettingComponent} from '../elements';


@NgModule({
    imports: [
        HomeRouting,
        CommonModule,
        DashboardModule
    ],
    declarations: [
      HomeComponent,
      PageNotFoundComponent,
      InternalErrorComponent,
      AsideComponent,
      SidebarComponent,
      HeaderComponent,
      SettingComponent
    ]
})
export class HomeModule {
}
