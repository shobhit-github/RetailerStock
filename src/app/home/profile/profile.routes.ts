import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile.component';
import {OverviewComponent} from './overview/overview.component';
import {ProjectsComponent} from './projects/projects.component';
import {EditAccountComponent} from './edit-account/edit-account.component';



const PROFILE_ROUTE_PROVIDER: Routes = [

    {
        path: '',
        component: ProfileComponent,
        children: [
            {
                path: 'overview',
                component: OverviewComponent
            },
            {
                path: 'edit-account',
                component: EditAccountComponent
            },
            {
                path: 'projects',
                component: ProjectsComponent
            },
            {
                path: 'change-password',
                component: OverviewComponent
            },


            {
              path: '',
              redirectTo: '/home/profile/overview',
              pathMatch: 'full'
            }

        ]
    },


];

export const ProfileRouting = RouterModule.forChild(PROFILE_ROUTE_PROVIDER);
