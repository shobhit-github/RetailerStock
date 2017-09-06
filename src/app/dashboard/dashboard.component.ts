import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as animation from './dashboard.animation';
import {WindowRef} from '../_shared/_helpers/window.ref';


@Component({
  templateUrl: './dashboard.component.html',
  animations: [
    animation.zoomIn,
    animation.slideToLeft,
    animation.fadeInOut
  ]
})
export class DashboardComponent implements AfterViewInit {


  constructor(public windowRef: WindowRef) {

  }

  ngAfterViewInit() {

    this.windowRef.nativeWindow.jQ.Index();
  }


}

