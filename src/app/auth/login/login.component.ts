import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../_shared/_services/index';

@Component({
  templateUrl: './login.component.html',
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
  host: {'[@zoomInOut]': 'true'},
  styleUrls: [
    './login.component.css'
  ]
})

export class LoginComponent implements OnInit {

  user: any = {};
  loading: boolean = false;
  returnUrl: string;
  loginError: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit = () => {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  };

  login = (): void => {

    this.loading = true;
    this.loginError = null;

    this.authenticationService.login(this.user.username, this.user.password)
      .subscribe(
        result => this.router.navigate([this.returnUrl]),
        error => this.handleError(error)
      );
  };


  private handleError = (error): void => {
    this.loginError = error.json().message;
    this.loading = false;
  }

}
