import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../_shared/_services/authentication.service"

@Component({
    templateUrl: 'app/auth/forgot.component.html',
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

export class ForgotComponent {

    loading: boolean = false;
    user: any = {};
    errorMessage: string;
    successMessage: string;

    constructor(private authenticationService: AuthenticationService){


    }

    forgotPassword() {

        this.loading = true;
        this.errorMessage = this.successMessage = null;

        this.authenticationService.forgotPassword(this.user.email)
            .subscribe(
                data=>{
                    this.successMessage = data.message;
                    this.loading = false;
                },
                error => {
                    this.errorMessage = error.json().message;
                    this.loading = false;
                }
            );
    }
}