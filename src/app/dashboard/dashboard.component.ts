


import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as animation from './dashboard.animation';


@Component({
    templateUrl: './dashboard.component.html',
    animations: [
        animation.zoomIn,
        animation.slideToLeft,
        animation.fadeInOut
    ]
})

export class DashboardComponent implements AfterViewInit {


    constructor() {

    }

    ngAfterViewInit() {
        // Index.init()
    }


}
