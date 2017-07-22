import {trigger,state, style, animate, transition} from "@angular/core";


export const zoomIn = trigger('zoomIn', [
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
]);

