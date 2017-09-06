import {animate, state, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {WindowRef} from '../_shared/_helpers/window.ref';

@Component({
  selector: 'app-sidebar',
  animations: [
    trigger('sidebarTransition', [
      state('void', style({position: 'fixed'})),
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('0.5s 0.5s ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(100%)'}),
        animate('0.5s 0.5s ease-in', style({transform: 'translateX(10%)'}))
      ])
    ])
  ],
  template: `
    <!-- sidebar -->
    <div [@sidebarTransition]="" class="sidebar app-aside" id="sidebar">
      <div class="sidebar-container perfect-scrollbar">
        <nav>
          <!-- start: SEARCH FORM -->
          <div class="search-form">
            <a class="s-open" href="javascript:void(0);">
              <i class="ti-search"></i>
            </a>
            <form class="navbar-form" role="search">
              <a class="s-remove" href="javascript:void(0);" target=".navbar-form">
                <i class="ti-close"></i>
              </a>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Search...">
                <button class="btn search-button" type="submit">
                  <i class="ti-search"></i>
                </button>
              </div>
            </form>
          </div>
          <!-- end: SEARCH FORM -->
          <!-- start: MAIN NAVIGATION MENU -->
          <div class="navbar-title">
            <span>Main Navigation</span>
          </div>
          <ul class="main-navigation-menu">
            <li class="active open">
              <a routerLink="/home/dashboard">
                <div class="item-content">
                  <div class="item-media">
                    <i class="ti-home"></i>
                  </div>
                  <div class="item-inner">
                    <span class="title"> Dashboard </span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <div class="item-content">
                  <div class="item-media">
                    <i class="ti-settings"></i>
                  </div>
                  <div class="item-inner">
                    <span class="title"> UI Elements </span><i class="icon-arrow"></i>
                  </div>
                </div>
              </a>
              <ul class="sub-menu">
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Elements </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Buttons </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Links </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Font Awesome Icons </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Linear Icons </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Modals </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Toggle </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Tabs &amp; Accordions </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Panels </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Notifications </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Treeview </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Media Object </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Nestable List </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Typography </span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:void(0)">
                <div class="item-content">
                  <div class="item-media">
                    <i class="ti-layout-grid2"></i>
                  </div>
                  <div class="item-inner">
                    <span class="title"> Tables </span><i class="icon-arrow"></i>
                  </div>
                </div>
              </a>
              <ul class="sub-menu">
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Basic Tables</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Responsive Tables</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Advanced Data Tables</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:void(0)">
                <div class="item-content">
                  <div class="item-media">
                    <i class="ti-pencil-alt"></i>
                  </div>
                  <div class="item-inner">
                    <span class="title"> Forms </span><i class="icon-arrow"></i>
                  </div>
                </div>
              </a>
              <ul class="sub-menu">
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Form Elements</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Text Editor</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Form Wizard</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Form Validation</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Image Cropping</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Multiple File Upload</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:void(0)">
                <div class="item-content">
                  <div class="item-media">
                    <i class="ti-user"></i>
                  </div>
                  <div class="item-inner">
                    <span class="title"> Login </span><i class="icon-arrow"></i>
                  </div>
                </div>
              </a>
              <ul class="sub-menu">
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Login Form </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Registration Form </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title"> Forgot Password Form </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Lock Screen</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:void(0)">
                <div class="item-content">
                  <div class="item-media">
                    <i class="ti-layers-alt"></i>
                  </div>
                  <div class="item-inner">
                    <span class="title"> Pages </span><i class="icon-arrow"></i>
                  </div>
                </div>
              </a>
              <ul class="sub-menu">
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">User Profile</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Invoice</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Timeline</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Calendar</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Messages</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Blank Page</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:void(0)">
                <div class="item-content">
                  <div class="item-media">
                    <i class="ti-package"></i>
                  </div>
                  <div class="item-inner">
                    <span class="title"> Utilities </span><i class="icon-arrow"></i>
                  </div>
                </div>
              </a>
              <ul class="sub-menu">
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Search Results</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Error 404</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Error 500</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="title">Pricing Table</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:void(0)">
                <div class="item-content">
                  <div class="item-media">
                    <i class="ti-folder"></i>
                  </div>
                  <div class="item-inner">
                    <span class="title"> 3 Level Menu </span><i class="icon-arrow"></i>
                  </div>
                </div>
              </a>
              <ul class="sub-menu">
                <li>
                  <a href="javascript:;">
                    <span>Item 1</span> <i class="icon-arrow"></i>
                  </a>
                  <ul class="sub-menu">
                    <li>
                      <a href="javascript:void(0);">
                        Sample Link 1
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        Sample Link 2
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        Sample Link 3
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;">
                    <span>Item 2</span> <i class="icon-arrow"></i>
                  </a>
                  <ul class="sub-menu">
                    <li>
                      <a href="javascript:void(0);">
                        Sample Link 1
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        Sample Link 2
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        Sample Link 3
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;">
                    <span>Item 3</span> <i class="icon-arrow"></i>
                  </a>
                  <ul class="sub-menu">
                    <li>
                      <a href="javascript:void(0);">
                        Sample Link 1
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        Sample Link 2
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        Sample Link 3
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:void(0)">
                <div class="item-content">
                  <div class="item-media">
                    <i class="ti-menu-alt"></i>
                  </div>
                  <div class="item-inner">
                    <span class="title"> 4 Level Menu </span><i class="icon-arrow"></i>
                  </div>
                </div>
              </a>
              <ul class="sub-menu">
                <li>
                  <a href="javascript:;">
                    <span>Item 1</span> <i class="icon-arrow"></i>
                  </a>
                  <ul class="sub-menu">
                    <li>
                      <a href="javascript:;">
                        <span>Sample Link 1</span> <i class="icon-arrow"></i>
                      </a>
                      <ul class="sub-menu">
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 1
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 2
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 3
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="javascript:;">
                        <span>Sample Link 2</span> <i class="icon-arrow"></i>
                      </a>
                      <ul class="sub-menu">
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 1
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 2
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 3
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="javascript:;">
                        <span>Sample Link 3</span> <i class="icon-arrow"></i>
                      </a>
                      <ul class="sub-menu">
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 1
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 2
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 3
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;">
                    <span>Item 2</span> <i class="icon-arrow"></i>
                  </a>
                  <ul class="sub-menu">
                    <li>
                      <a href="javascript:;">
                        <span>Sample Link 1</span> <i class="icon-arrow"></i>
                      </a>
                      <ul class="sub-menu">
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 1
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 2
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 3
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="javascript:;">
                        <span>Sample Link 2</span> <i class="icon-arrow"></i>
                      </a>
                      <ul class="sub-menu">
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 1
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 2
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 3
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="javascript:;">
                        <span>Sample Link 3</span> <i class="icon-arrow"></i>
                      </a>
                      <ul class="sub-menu">
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 1
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 2
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 3
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;">
                    <span>Item 3</span> <i class="icon-arrow"></i>
                  </a>
                  <ul class="sub-menu">
                    <li>
                      <a href="javascript:;">
                        <span>Sample Link 1</span> <i class="icon-arrow"></i>
                      </a>
                      <ul class="sub-menu">
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 1
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 2
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 3
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="javascript:;">
                        <span>Sample Link 2</span> <i class="icon-arrow"></i>
                      </a>
                      <ul class="sub-menu">
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 1
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 2
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 3
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="javascript:;">
                        <span>Sample Link 3</span> <i class="icon-arrow"></i>
                      </a>
                      <ul class="sub-menu">
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 1
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 2
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Sample Link 3
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:void(0)">
                <div class="item-content">
                  <div class="item-media">
                    <i class="ti-location-pin"></i>
                  </div>
                  <div class="item-inner">
                    <span class="title"> Maps </span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <div class="item-content">
                  <div class="item-media">
                    <i class="ti-pie-chart"></i>
                  </div>
                  <div class="item-inner">
                    <span class="title"> Charts </span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <!-- end: MAIN NAVIGATION MENU -->
          <!-- start: CORE FEATURES -->
          <div class="navbar-title">
            <span>Core Features</span>
          </div>
          <ul class="folders">
            <li>
              <a href="javascript:void(0)">
                <div class="item-content">
                  <div class="item-media">
                    <span class="fa-stack"> <i class="fa fa-square fa-stack-2x"></i> <i
                      class="fa fa-terminal fa-stack-1x fa-inverse"></i> </span>
                  </div>
                  <div class="item-inner">
                    <span class="title"> Calendar </span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <div class="item-content">
                  <div class="item-media">
                    <span class="fa-stack"> <i class="fa fa-square fa-stack-2x"></i> <i
                      class="fa fa-folder-open-o fa-stack-1x fa-inverse"></i> </span>
                  </div>
                  <div class="item-inner">
                    <span class="title"> Messages </span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <!-- end: CORE FEATURES -->
          <!-- start: DOCUMENTATION BUTTON -->
          <div class="wrapper">
            <a href="javascript:void(0)" class="button-o">
              <i class="ti-help"></i>
              <span>Documentation</span>
            </a>
          </div>
          <!-- end: DOCUMENTATION BUTTON -->
        </nav>
      </div>
    </div>
    <!-- / sidebar -->

  `
})

export class SidebarComponent implements AfterViewInit {

  constructor(public windowRef: WindowRef) {

  }

  ngAfterViewInit() {
    this.windowRef.nativeWindow.jQ.Main();
  }

}
