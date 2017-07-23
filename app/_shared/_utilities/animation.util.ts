import {trigger,state, style, animate, transition} from "@angular/core";


export const zoomIn = trigger('zoomIn', [
    state('in', style({transform:'scale(0)'}) ),
    transition(':enter', [
        style({transform: 'scale(0)'}),
        animate('1s 1s ease-in-out', style({transform: 'scale(1)'}))
    ]),
    transition(':leave', [
        style({transform: 'scale(1)'}),
        animate('1s 1s ease-in-out', style({transform: 'scale(0)'}))
    ])
]);

function slideToRight() {
    return trigger('routerTransition', [
        state('void', style({position:'fixed', width:'100%'}) ),
        state('*', style({position:'fixed', width:'100%'}) ),
        transition(':enter', [
            style({transform: 'translateX(-100%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
        ]),
        transition(':leave', [
            style({transform: 'translateX(0%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(100%)'}))
        ])
    ]);
}

function slideToLeft() {
    return trigger('routerTransition', [
        state('void', style({position:'fixed', width:'100%'}) ),
        state('*', style({position:'fixed', width:'100%'}) ),
        transition(':enter', [
            style({transform: 'translateX(100%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
        ]),
        transition(':leave', [
            style({transform: 'translateX(0%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
        ])
    ]);
}

function slideToBottom() {
    return trigger('routerTransition', [
        state('void', style({position:'fixed', width:'100%', height:'100%'}) ),
        state('*', style({position:'fixed', width:'100%', height:'100%'}) ),
        transition(':enter', [
            style({transform: 'translateY(-100%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
        ]),
        transition(':leave', [
            style({transform: 'translateY(0%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
        ])
    ]);
}

function slideToTop() {
    return trigger('routerTransition', [
        state('void', style({position:'fixed', width:'100%', height:'100%'}) ),
        state('*', style({position:'fixed', width:'100%', height:'100%'}) ),
        transition(':enter', [
            style({transform: 'translateY(100%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
        ]),
        transition(':leave', [
            style({transform: 'translateY(0%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
        ])
    ]);
}

