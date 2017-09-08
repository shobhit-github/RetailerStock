import { Component } from '@angular/core';
import * as animation from './overview.animation';


@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  animations: [
      animation.fadeInOut
  ]
})
export class OverviewComponent {


  constructor() {
  }

}

