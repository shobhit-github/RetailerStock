import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as util from '../_shared/_utilities/index';

@Component({
    templateUrl: 'app/auth/register.component.html',
    animations:[util.zoomIn],
    host:{'[@zoomIn]':''}
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    state:string = 'small';

    constructor(
        private router: Router) { }


    register() {
        this.loading = true;
        /*this.userService.create(this.model)
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });*/
    }
}