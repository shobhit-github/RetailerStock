import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'app/auth/register/register.component.html',
    animations: [
        trigger('zoomInOut', [

            transition(':enter', [
                style({transform: 'scale(0)', position:'fixed', width:'100%'}),
                animate('0.5s ease-in-out', style({transform: 'scale(1)'}))
            ]),
            transition(':leave', [
                style({transform: 'scale(1)', position:'fixed', width:'100%'}),
                animate('0.5s ease-in-out', style({transform: 'scale(0)'}))
            ])
        ])
    ],
    host:{'[@zoomInOut]':'true'}
})

export class RegisterComponent {
    user: any = {};
    loading = false;
    state:string = 'small';
    userForm: any;

    constructor(
        private router: Router) {

    }


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