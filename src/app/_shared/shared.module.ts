import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

// shared functionality for guard, helpers, pipes and services
import {AuthGuard} from './_guards';
import {MessageService, EmitterService, WindowRef} from './_helpers';
import {AuthenticationService} from './_services';


// shared functionality for ui components
import {AlertComponent} from './_ui';

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        AlertComponent
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        MessageService,
        EmitterService,
        WindowRef
    ]
})
export class SharedModule {
}
