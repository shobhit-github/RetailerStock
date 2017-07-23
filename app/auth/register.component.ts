import {animate, Component, OnInit, state, style, transition, trigger} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'app/auth/register.component.html',
    animations: [
        trigger('zoomInOut', [
            state('void', style({position:'fixed', width:'100%'}) ),
            state('*', style({position:'fixed', width:'100%'}) ),
            transition(':enter', [
                style({transform: 'scale(0)'}),
                animate('0.5s ease-in-out', style({transform: 'scale(1)'}))
            ]),
            transition(':leave', [
                style({transform: 'scale(1)'}),
                animate('0.5s ease-in-out', style({transform: 'scale(0)'}))
            ])
        ])
    ],
    host:{'[@zoomInOut]':''}
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