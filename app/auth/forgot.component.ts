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

    constructor(private authenticationService: AuthenticationService){

        console.log("CALLED");
    }

    forgotPassword() {
        this.loading = true;
        this.authenticationService.forgotPassword(this.user.email)
            .subscribe(
                data=>{
                    this.user.message = data.message;
                    this.user.status = 'success';
                    this.loading = false;
                },
                error => {
                    this.user.message = error.json().message;
                    this.user.status = 'error';
                    this.loading = false;
                }
            );
    }
}