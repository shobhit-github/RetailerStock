import {AfterViewInit, Component, HostBinding, OnInit} from '@angular/core';
import {WindowRef} from '../../_shared/_helpers/window.ref';
import * as animation from './profile.animation';


@Component({
  template: `    
      <div class="wrap-content container" id="container">
          <!-- start: PAGE TITLE -->
          <section [@fadeInOut]="" id="page-title">
              <div class="row">
                  <div class="col-sm-8">
                      <h1 class="mainTitle">User Profile</h1>
                      <span class="mainDescription">There are many systems which have a need for user profile pages which display personal information on each member.</span>
                  </div>
                  <ol class="breadcrumb">
                      <li>
                          <span>Pages</span>
                      </li>
                      <li class="active">
                          <span>User Profile</span>
                      </li>
                  </ol>
                </div>
          </section>
          <!-- end: PAGE TITLE -->
          <!-- start: USER PROFILE -->
          <div [@mainSection]="" class="container-fluid container-fullw bg-white">
              <div class="row">
                  <div class="col-md-12">
                      <div class="tabbable">
                          <ul class="nav nav-tabs tab-padding tab-space-3 tab-blue" id="myTab4">
                              <li [routerLinkActive]="['active']">
                                  <a data-toggle="tab" [routerLink]="['/home/profile/overview']" >
                                    Overview
                                  </a>
                              </li>
                              <li [routerLinkActive]="['active']">
                                  <a data-toggle="tab" [routerLink]="['/home/profile/edit-account']">
                                    Edit Account
                                  </a>
                              </li>
                              <li [routerLinkActive]="['active']">
                                  <a data-toggle="tab" [routerLink]="['/home/profile/projects']">
                                    Projects
                                  </a>
                              </li>
                          </ul>
                          <div class="tab-content">
                              <router-outlet></router-outlet>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        <!-- end: USER PROFILE -->
      </div>
  `,
  animations: [
    animation.fadeInOut,
    animation.mainSection
  ],
})
export class ProfileComponent implements AfterViewInit {


  constructor(public windowRef: WindowRef) {

  }

  ngAfterViewInit() {

    this.windowRef.nativeWindow.jQ.Main();
  }

}

