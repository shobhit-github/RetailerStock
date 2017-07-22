import { Component, OnInit } from '@angular/core';
import * as util from '../_shared/_utilities/index';

@Component({
    templateUrl: 'app/auth/forgot.component.html',
    animations: [ util.zoomIn ],
    host:{'[@zoomIn]':''}
})

export class ForgotComponent {

}