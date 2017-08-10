import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_shared/_services/index';

@Component({
    templateUrl: 'app/auth/login/login.component.html',
    providers:[AuthenticationService],
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

export class LoginComponent implements OnInit {

    user: any = {};
    loading:boolean = false;
    returnUrl: string;
    loginError: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {

        this.loading = true;
        this.loginError = null;

        this.authenticationService.login(this.user.username, this.user.password)
            .subscribe(
                data => {

                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loading = error.json().status;
                    this.loginError = error.json().message;
                }
            );
    }

}