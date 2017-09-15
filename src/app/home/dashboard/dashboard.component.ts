import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import * as animation from './dashboard.animation';
import {WindowRef, MessageService} from '../../_shared/_helpers/';
import {Subscription} from 'rxjs/Subscription';


@Component({
  templateUrl: './dashboard.component.html',
  animations: [
      animation.manageUser,
      animation.manageOrder,
      animation.manageDb,
      animation.visits,
      animation.acquisition,
      animation.monthlyStats,
      animation.newUser,
      animation.users,
      animation.specialization,
      animation.todayGr,
      animation.todayRed,
      animation.activity,
      animation.chat,
      animation.fadeInOut
  ],
  styleUrls:['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnInit, OnDestroy {


    constructor(public windowRef: WindowRef,
                public messageService: MessageService) {
    }

    ngOnInit() {

    }


    passMessage = (): void => {

        this.messageService.sendMessage('titleMessage', 'Test Message', 'success');
    };


    ngAfterViewInit() {

        this.windowRef.nativeWindow.jQ.Index();
    }

    ngOnDestroy() {

    }
}

