import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthenticationService } from '../../_shared/_services/index';

@Component({
    templateUrl: './reset-password.component.html',
    providers: [AuthenticationService],
    animations: [
        trigger('zoomInOut', [

            transition(':enter', [
                style({transform: 'scale(0)', position: 'fixed', width: '100%'}),
                animate('0.5s ease-in-out', style({transform: 'scale(1)'}))
            ]),
            transition(':leave', [
                style({transform: 'scale(1)', position: 'fixed', width: '100%'}),
                animate('0.5s ease-in-out', style({transform: 'scale(0)'}))
            ])
        ])
    ],
    host: {'[@zoomInOut]': 'true'}
})

export class ResetPasswordComponent implements OnInit {
    user: any = {};
    loading: boolean = false;
    returnUrl: string;
    message: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit = () => {

        // get return url from route parameters or default to '/'
        this.returnUrl = '/';

        this.route.params.subscribe((params: Params) => {
            this.user.id = params['id'];
        });
    }

    setNewPassword = (): void => {
        this.loading = true;
        this.authenticationService.resetPassword(this.user.id, this.user.password)
            .subscribe(
                data => {
                    this.loginNow(data.data);
                },
                error => {
                    console.log(error.json());
                }
            );
    }

    private loginNow = (user: any): void => {

        this.authenticationService.login(user.username, user.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loading = error.json().status;
                }
            );

    }


}
