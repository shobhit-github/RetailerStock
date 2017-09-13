import {Component, OnInit} from '@angular/core';
import {transition, trigger, style, animate} from '@angular/animations';
import {ActivatedRoute} from '@angular/router';


@Component({


    template: `
        <!-- start: 500 -->
        <div [@zoomIn]="" class="error-full-page">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 page-error">
                        <div class="error-number text-red">
                            {{errorCode}}
                        </div>
                        <div class="error-details col-sm-6 col-sm-offset-3">
                            <h3>Oops! You are stuck at {{errorCode}}</h3>
                            <p>
                                Something's wrong!
                                <br>
                                It looks as though we've broken something on our system.
                                <br>
                                Don't panic, we are fixing it! Please come back in a while.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end: 500 -->
    `,

    animations: [
        trigger('zoomIn', [
            transition(':enter', [
                style({transform: 'scale(0)'}),
                animate('600ms ease-in-out', style({transform: 'scale(1)'}))
            ])
        ])],
    host: {'[@zoomIn]': ''}
})


export class InternalErrorComponent implements OnInit {

    errorCode: number;


    constructor(private route: ActivatedRoute) {

    }

    ngOnInit = () => {

        this.errorCode = this.route.snapshot.queryParams['errorCode'] || 500;
    }
}
