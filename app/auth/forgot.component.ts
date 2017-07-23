import {animate, Component, OnInit, state, style, transition, trigger} from '@angular/core';

@Component({
    templateUrl: 'app/auth/forgot.component.html',
    animations: [
        trigger('zoomInOut', [
            state('void', style({position:'fixed', width:'100%'}) ),
            state('*', style({position:'fixed', width:'100%'}) ),
            transition(':enter', [
                style({transform: 'scale(0)'}),
                animate('0.5s ease-in-out', style({transform: 'scale(1)'}))
            ]),
            transition(':leave', [
                style({transform: 'scale(1)'}),
                animate('0.5s ease-in-out', style({transform: 'scale(0)'}))
            ])
        ])
    ],
    host:{'[@zoomInOut]':''}
})

export class ForgotComponent {

}