import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MessageService} from '../../../_helpers';
import {Subscription} from 'rxjs/Subscription';


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
        animate(5000)
      ])
    ])
  ],
  template: `
      <!-- This html use for the success notification as alert -->
      <div *ngIf="type=='success'" role="alert" class="alert alert-success">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
          <strong>Well done!</strong> You successfully read this important alert message.
      </div>
      <!-- This html use for the information notification as alert -->
      <div *ngIf="type=='info'" class="alert alert-info">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
             <span aria-hidden="true">&times;</span>
          </button>
          <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
      </div>
      <!-- This html use for the warning notification as alert -->
      <div *ngIf="type=='warning'" class="alert alert-warning">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
          <strong>Warning!</strong> Better check yourself, you're not looking too good.
      </div>
      <!-- This html use for the error notification as alert -->
      <div *ngIf="type=='error'" class="alert alert-danger">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>Oh snap!</strong> Change a few things up and try this operation again.
      </div>
  `,
  styles: [`
      .alert {
        margin-bottom: 0;
        border-radius: 0;
      }
  `]
})

export class AlertComponent implements OnInit, OnDestroy {

    public subscription: Subscription;

    public type: string;
    public text: string;


    constructor(private messageService: MessageService) {
    }

    ngOnInit() {

        this.subscription = this.messageService.getMessage()
            .subscribe(
                data => {
                    if(!data) {
                      return this.type = null;
                    }
                    this.type = data.type;
                    this.text = data.message;
                },
                error => console.error(error)
            );
    }

    ngOnDestroy() {

        this.subscription.unsubscribe();
    }
}
