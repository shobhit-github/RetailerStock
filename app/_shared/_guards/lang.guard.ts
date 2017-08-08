import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';


@Injectable()
export class LangGuard implements CanActivate {

    private lang: string;

    constructor() {

        this.lang = localStorage.getItem('_lang');
    }

    canActivate() {

        if (localStorage.getItem('_lang')) {


        }

        // not logged in so redirect to login page with the return url
        return false;
    }




}