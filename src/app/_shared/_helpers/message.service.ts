import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MessageService {

    private subject = new Subject<any>();


    constructor(){
    }


    sendMessage = (title: string, message: string, type: string) => {
        this.subject.next({title, message, type});
    };


    clearMessage = () => {
        this.subject.next();
    };


    getMessage = (): Observable<any> => {
        return this.subject.asObservable();
    }


}
