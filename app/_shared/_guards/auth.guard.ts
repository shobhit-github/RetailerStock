import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {CONFIG} from "../../app.config";
import "rxjs/add/operator/map";

@Injectable()
export class AuthGuard implements CanActivate {

    private headers: Headers = new Headers();
    private options: any;

    constructor(private router: Router,
                private http: Http) {

        this.headers.append('Authorization', localStorage.getItem('_token'));
        this.headers.append('Language', localStorage.getItem('_lang'));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('_token')) {

            this.http.get(CONFIG.SERVER_URL + 'check_auth', {headers:this.headers})
                .map((response: Response) => response.json())
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
                        console.log(error);
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

}