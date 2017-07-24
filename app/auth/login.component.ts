import {animate, Component, OnInit, state, style, transition, trigger} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_shared/_services/index';

@Component({
    templateUrl: 'app/auth/login.component.html',
    providers:[AuthenticationService],
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

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

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
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loading = false;
                });
    }

}