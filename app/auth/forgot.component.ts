import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: 'app/auth/forgot.component.html',
    animations: [
        trigger('zoomInOut', [
            transition(':enter', [
                style({transform: 'scale(0)', position:'fixed', width:'100%'}),
                animate('0.5s ease-in-out', style({transform: 'scale(1)'}))
            ]),
            transition(':leave', [
                style({transform: 'scale(1)', position:'fixed', width:'100%'}),
                animate('0.5s ease-in-out', style({transform: 'scale(0)'}))
            ])
        ])
    ],
    host:{'[@zoomInOut]':'true'}
})

export class ForgotComponent {

}