import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'ui-alert',
  animations: [
    trigger('headerTransition', [
      state('void', style({position: 'fixed'})),
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate(500)
      ]),
      transition(':leave', [
        style({transform: 'translateY(0%)'}),
        animate(500)
      ])
    ])
  ],
  template: `
      <!-- This html use for the success notification as alert -->
      <div role="alert" class="alert alert-success">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
          <strong>Well done!</strong> You successfully read this important alert message.
      </div>
      
      <!-- This html use for the information notification as alert -->
      <div class="alert alert-info">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
             <span aria-hidden="true">&times;</span>
          </button>
          <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
      </div>

      <!-- This html use for the warning notification as alert -->
      <div class="alert alert-warning">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
          <strong>Warning!</strong> Better check yourself, you're not looking too good.
      </div>

      <!-- This html use for the error notification as alert -->
      <div class="alert alert-danger">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>Oh snap!</strong> Change a few things up and try this operation again.
      </div>
  `
})

export class AlertComponent implements OnInit {

    constructor(){
    }

    ngOnInit() {

    }
}
