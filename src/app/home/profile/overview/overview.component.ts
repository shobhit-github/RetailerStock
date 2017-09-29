import {Component, OnInit} from '@angular/core';
import * as animation from './overview.animation';
import {AuthModule} from '../../../auth/auth.module';
import {AuthGuard} from '../../../_shared/_guards/auth.guard';


@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  animations: [
    animation.fadeInOut
  ]
})
export class OverviewComponent implements OnInit{


    constructor(private guard: AuthGuard) {
    }

    ngOnInit() {
        console.log('UIUI');
        this.guard.getAuthenticatedData
            .subscribe(data => console.log('session data --->',data))
    }
}

