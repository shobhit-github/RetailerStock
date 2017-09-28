import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MessageService {

    public subject = new Subject<any>();


    constructor() {
    }


    sendMessage = (title: string, message: string, type: string, showAs: string) => {
        this.subject.next({title, message, type, showAs});
        this.clearMessage();
    };


    private clearMessage = () => {

        setTimeout( () => this.subject.next(false), 5000)
    };


    getMessage = (): Observable<any> => {
        return this.subject.asObservable();
    }


}
