import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Http, Headers, Response} from '@angular/http';
import {CONFIG} from "../../app.config";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthGuard implements CanActivate {

    private headers: Headers = new Headers();

    constructor(private router: Router,
                private http: Http) {

        this.headers.append('Authorization', localStorage.getItem('_token'));
        this.headers.append('Language', localStorage.getItem('_lang'));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('_token')) {

            this.http.get(CONFIG.SERVER_URL + 'check_auth', {headers: this.headers})
                .map((response: Response) => response.json())
                .catch( (e) =>  Observable.throw(this.handleError(e)) )
                .subscribe(
                    data => {
                        if (data && data.token) {
                            // store user details and jwt token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('_token', JSON.stringify(data.token));
                            // logged in so return true
                            return true;
                        }
                    },
                    error => {
                        // not logged in so redirect to login page with the return url
                        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
                        return false;
                    }
                )

        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }



    private handleError(error): void {

        this.router.navigate(['error_page'], {queryParams: {errorCode: error.status}});
    }


}