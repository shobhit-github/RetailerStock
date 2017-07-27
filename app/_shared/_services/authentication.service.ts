import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {CONFIG} from "../../app.config"
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(
        private http: Http,
        private headers:Headers) { }

    setHeaders() {
        this.headers.append('Authorization', localStorage.getItem('_token'));
        // this.headers.append('Language', localStorage.getItem('_lang'));
    }

    login(username: string, password: string) {
        return this.http.post(CONFIG.SERVER_URL+'login', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('_token', JSON.stringify(user.token));
                }
            });
    }

    checkAuthorization() {

        return this.http.get(CONFIG.SERVER_URL+'check_auth', {headers: this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('_token', JSON.stringify(user.token));
                }
            });
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('_token');
    }
}