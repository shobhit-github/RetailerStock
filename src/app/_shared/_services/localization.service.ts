import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LocalizationService {

    constructor() {
    }


    changeLanguage = (lang: string): void => {

        // store language in local storage to keep user logged in between page refreshes
        localStorage.setItem('_lang', lang);
    };


    getLanguage = (): object => {
        // retrieve language from local storage to keep user logged in between page refreshes
        return this.getLanguageList().filter(  data => data['tag'] == localStorage.getItem('_lang'));
    };


    getLanguageList = (): Array<object> => {

        return [
            {
                name: 'English',
                tag: 'en'
            },
            {
                name: 'Hindi',
                tag: 'hi'
            },
            {
                name: 'Punjabi',
                tag: 'pa'
            }
        ]
    }


}
