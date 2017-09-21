import { Component } from '@angular/core';
import * as animation from './projects.animation';


@Component({
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    animation.fadeInOut
  ]
})
export class ProjectsComponent {


  constructor() {
  }

}

