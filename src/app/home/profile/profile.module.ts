import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {ProfileRouting} from './profile.routes';
import {EditAccountComponent} from './edit-account/edit-account.component';
import {OverviewComponent} from './overview/overview.component';
import {ProjectsComponent} from './projects/projects.component';


@NgModule({
    imports: [
        CommonModule,
        ProfileRouting

    ],
    declarations: [
        ProfileComponent,
        OverviewComponent,
        ProjectsComponent,
        EditAccountComponent
    ]
})
export class ProfileModule {
}
