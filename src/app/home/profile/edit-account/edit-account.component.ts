import { Component } from '@angular/core';
import * as animation from './edit-account.animation';


@Component({
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css'],
  animations: [
    animation.fadeInOut
  ]
})
export class EditAccountComponent {


  constructor() {
  }

}

