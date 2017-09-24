import {EventEmitter, Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Http, Headers, Response} from '@angular/http';
import {CONFIG} from '../../app.config';
import {Observable} from 'rxjs/Rx';
import {AuthenticationService} from "../_services";

@Injectable()
export class AuthGuard implements CanActivate {

    private headers: Headers = new Headers();
    public getAuthenticatedData: EventEmitter<object> = new EventEmitter();

    constructor(private router: Router,
                private http: Http,
                private authenticationService: AuthenticationService) {

        this.headers.append('Authorization', localStorage.getItem('_token'));
        this.headers.append('Language', localStorage.getItem('_lang'));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {

        if (localStorage.getItem('_token')) {
            return this.ensureAuthenticate();
        } else {

            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
            return false;
        }

    }


    private ensureAuthenticate = (): any => {

        let observer;

        try {
            observer = this.http.get(CONFIG.SERVER_URL+'check_auth', { headers: this.headers})
                .map( (response: Response) => response.json() )
                .catch( (e): any => this.handleError(e) )
        } catch (err) {
            observer = Observable.of(false);
        }

        return observer.map(
            result => {
                if(result.success) {
                    this.getAuthenticatedData.emit(result.response);
                    return result.success;
                 }
                // not logged in so redirect to login page with the return url
                return this.router.navigate(['/login']);
            }
        )

    }


    // `private` method for handling the error
    private handleError = (error): void => {
        console.log(error.json());
        this.router.navigate(['/login']);
    }


}

