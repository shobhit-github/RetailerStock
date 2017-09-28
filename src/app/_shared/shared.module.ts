import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

// shared functionality for guard, helpers, pipes and services
import {AuthGuard} from './_guards';
import {MessageService, EmitterService, WindowRef} from './_helpers';
import {AuthenticationService, TranslationService} from './_services';
import {LoggerPipes, TranslatePipes} from './_pipes';

// shared functionality for ui components
import {AlertComponent} from './_ui';



@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        AlertComponent,

        // pipes declarations
        LoggerPipes,
        TranslatePipes
    ],
    providers: [
        AuthenticationService,
        TranslationService,
        AuthGuard,
        MessageService,
        EmitterService,
        WindowRef
    ],
    exports: [
      LoggerPipes,
      TranslatePipes,
      AlertComponent
    ]
})
export class SharedModule {
}
