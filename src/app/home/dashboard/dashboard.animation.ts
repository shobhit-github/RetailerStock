import {trigger, state, style, animate, transition, query, stagger, animateChild} from '@angular/animations';



export const manageUser = trigger('manageUser', [
    transition('void => *', [
        style({transform: 'scale(0)', opacity: 1}),
        animate('0.5s 1200ms ease-in-out')
    ]),
    transition('* => void', [
        animate('0.5s 1200ms ease-in-out', style({transform: 'scale(0)', opacity: 0}))
    ])
]);


export const manageOrder = trigger('manageOrder', [
    transition('void => *', [
      style({transform: 'scale(0)', opacity: 1}),
      animate('0.5s 1s ease-in-out')
    ]),
    transition('* => void', [
      animate('0.5s 1s ease-in-out', style({transform: 'scale(0)', opacity: 0}))
    ])
]);


export const manageDb = trigger('manageDb', [
    transition('void => *', [
      style({transform: 'scale(0)', opacity: 1}),
      animate('0.5s 1300ms ease-in-out')
    ]),
    transition('* => void', [
      animate('0.5s 1300ms ease-in-out', style({transform: 'scale(0)', opacity: 0}))
    ])
]);


export const visits = trigger('visits', [
    transition('void => *', [
      style({transform: 'scale(0)', opacity: 1}),
      animate('0.5s 1400ms ease-in-out')
    ]),
    transition('* => void', [
      animate('0.5s 1400ms ease-in-out', style({transform: 'scale(0)', opacity: 0}))
    ])
]);


export const acquisition = trigger('acquisition', [
    transition('void => *', [
      style({transform: 'scale(0)', opacity: 1}),
      animate('0.5s 1100ms ease-in-out')
    ]),
    transition('* => void', [
      animate('0.5s 1100ms ease-in-out', style({transform: 'scale(0)', opacity: 0}))
    ])
]);


export const monthlyStats = trigger('monthlyStats', [
    transition('void => *', [
      style({transform: 'scale(0)', opacity: 1}),
      animate('0.5s 2100ms ease-in-out')
    ]),
    transition('* => void', [
      animate('0.5s 2100ms ease-in-out', style({transform: 'scale(0)', opacity: 0}))
    ])
]);


export const newUser = trigger('newUser', [
    transition('void => *', [
      style({transform: 'scale(0)', opacity: 1}),
      animate('0.5s 1400ms ease-in-out')
    ]),
    transition('* => void', [
      animate('0.5s 1400ms ease-in-out', style({transform: 'scale(0)', opacity: 0}))
    ])
]);


export const users = trigger('users', [
    transition('void => *', [
      style({transform: 'scale(0)', opacity: 1}),
      animate('0.5s 1500ms ease-in-out')
    ]),
    transition('* => void', [
      animate('0.5s 1500ms ease-in-out', style({transform: 'scale(0)', opacity: 0}))
    ])
]);


export const specialization = trigger('specialization', [
    transition('void => *', [
      style({transform: 'scale(0)', opacity: 1}),
      animate('0.5s 2s ease-in-out')
    ]),
    transition('* => void', [
      animate('0.5s 2s ease-in-out', style({transform: 'scale(0)', opacity: 0}))
    ])
]);


export const activity = trigger('activity', [
    transition('void => *', [
      style({transform: 'scale(0)', opacity: 1}),
      animate('0.5s 1600ms ease-in-out')
    ]),
    transition('* => void', [
      animate('0.5s 1600ms ease-in-out', style({transform: 'scale(0)', opacity: 0}))
    ])
]);


export const chat = trigger('chat', [
    transition('void => *', [
      style({transform: 'scale(0)', opacity: 1}),
      animate('0.5s 1700ms ease-in-out')
    ]),
    transition('* => void', [
      animate('0.5s 1700ms ease-in-out', style({transform: 'scale(0)', opacity: 0}))
    ])
]);


export const todayGr = trigger('todayGr', [
    transition('void => *', [
      style({transform: 'scale(0)', opacity: 1}),
      animate('0.5s 1800ms ease-in-out')
    ]),
    transition('* => void', [
      animate('0.5s 1800ms ease-in-out', style({transform: 'scale(0)', opacity: 0}))
    ])
]);


export const todayRed = trigger('todayRed', [
    transition('void => *', [
      style({transform: 'scale(0)', opacity: 1}),
      animate('0.5s 1900ms ease-in-out')
    ]),
    transition('* => void', [
      animate('0.5s 1900ms ease-in-out', style({transform: 'scale(0)', opacity: 0}))
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
