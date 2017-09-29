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
                private guard: AuthGuard) {
    }

    ngOnInit() {

        this.guard.getAuthenticatedData
            .subscribe(data => console.log('session data --->',data))
    }


    passMessage = (): void => this.messageService.sendMessage('titleMessage', 'Test Message', 'success', 'alert');


    ngAfterViewInit() {

        this.windowRef.nativeWindow.jQ.Index();
    }

    ngOnDestroy() {

    }
}

