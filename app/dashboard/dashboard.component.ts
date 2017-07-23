


import {Component, OnInit} from '@angular/core';
import * as util from '../_shared/_utilities/index';

@Component({
    templateUrl: 'app/dashboard/dashboard.component.html',
    animations: [util.zoomIn]
})

export class DashboardComponent implements OnInit {



    constructor() {

    }

    ngOnInit() {
        Index.init();
    }
}