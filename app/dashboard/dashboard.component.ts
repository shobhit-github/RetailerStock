


import {Component, OnInit} from '@angular/core';
import * as animation from './dashboard.animation';


@Component({
    templateUrl: 'app/dashboard/dashboard.component.html',
    animations: [
        animation.zoomIn,
        animation.slideToLeft,
        animation.fadeInOut
    ]
})

export class DashboardComponent implements OnInit {


    constructor() {

    }

    ngOnInit() {

    }


}