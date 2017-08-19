import {trigger, state, style, animate, transition, query, stagger, animateChild} from '@angular/animations';



export const zoomIn = trigger('zoomIn', [
    transition('void => *', [
        style({transform: 'scale(0)', opacity: 1}),
        animate('0.5s ease-in-out')
    ]),
    transition('* => void', [
        animate('0.5s ease-in-out', style({transform: 'scale(0)', opacity: 0}))
    ])
]);


export const slideToLeft = trigger('slideToLeft', [

    transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
        style({transform: 'translateX(0%)'}),
        animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    ])
]);


export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({'opacity': 0}),
        animate('1s ease-in-out', style({'opacity': 1}))
    ]),
    transition(':leave', [
        style({'opacity': 1}),
        animate('1s ease-in-out', style({'opacity': 0}))
    ])
]);
