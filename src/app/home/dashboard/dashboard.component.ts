import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import * as animation from './dashboard.animation';
import {WindowRef, MessageService} from '../../_shared/_helpers/';
import {TranslationService} from '../../_shared/_services/translation.service';
import {AuthGuard} from "../../_shared/_guards/auth.guard";

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
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnInit, OnDestroy {


    constructor(public windowRef: WindowRef,
                public messageService: MessageService,
                private translationService: TranslationService,
                private guard: AuthGuard){
    }

    ngOnInit() {
      console.log(this.guard.getAuthenticatedData);
        this.guard.getAuthenticatedData
            .subscribe(data => console.log('session data --->',data), err => console.log(err))
    }


    passMessage = (): void => {

        this.messageService.sendMessage('titleMessage', 'Test Message', 'success', 'alert');
    }


    ngAfterViewInit() {

        this.windowRef.nativeWindow.jQ.Index();
        console.log('ghghghgg');
      console.log(this.guard.getAuthenticatedData);

    }

    ngOnDestroy() {

    }
}

