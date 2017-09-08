import {trigger, state, style, animate, transition, query, stagger, animateChild} from '@angular/animations';




export const mainSection = trigger('mainSection', [
    transition('void => *', [
      style({transform: 'scale(0)', opacity: 1}),
      animate('0.5s 1s ease-in-out')
    ]),
    transition('* => void', [
      animate('0.5s 1s ease-in-out', style({transform: 'scale(0)', opacity: 0}))
    ])
]);



export const fadeInOut = trigger('fadeInOut', [

    transition(':enter', [
        style({opacity: 0}),
        animate('1s ease-in', style({opacity: 1}))
    ]),
    transition(':leave', [
        style({opacity: 1}),
        animate('1s ease-out', style({opacity: 0}))
    ])
]);


