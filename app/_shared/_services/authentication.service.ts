import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {CONFIG} from "../../app.config"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {

    headers: Headers = new Headers();

    constructor(
        private http: Http) {
    }


    login(username: string, password: string) {
        return this.http.post(CONFIG.SERVER_URL+'login', { username: username, password: password})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('_token', JSON.stringify(user.token));
                }
            });
    }


    resetPassword(encryptedId: string, password: string) {
        return this.http.post(CONFIG.SERVER_URL+'reset_password', {email: encryptedId, password: password})
            .map((response: Response) => response.json());
    }


    forgotPassword(email: string) {
        return this.http.post(CONFIG.SERVER_URL+'forgot_password', {email: email})
            .map((res: Response)=>res.json())
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('_token');
    }



}