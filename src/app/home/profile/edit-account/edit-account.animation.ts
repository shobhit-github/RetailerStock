import {trigger, state, style, animate, transition, query, stagger, animateChild} from '@angular/animations';




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


