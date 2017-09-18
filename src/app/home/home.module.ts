import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// custom components and routing
import {HomeComponent} from './home.component';
import {HomeRouting} from './home.routes';
import {PageNotFoundComponent, InternalErrorComponent, AsideComponent, SidebarComponent, HeaderComponent, SettingComponent} from '../elements';

// custom modules
import {DashboardModule} from './dashboard/dashboard.module';
import {ProfileModule} from './profile/profile.module';
import {SharedModule} from '../_shared/shared.module';




@NgModule({
    imports: [
        SharedModule,
        HomeRouting,
        CommonModule,
        DashboardModule,
        ProfileModule
    ],
    declarations: [
        HomeComponent,
        PageNotFoundComponent,
        InternalErrorComponent,
        AsideComponent,
        SidebarComponent,
        HeaderComponent,
        SettingComponent

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {
}
