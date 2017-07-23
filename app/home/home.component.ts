

import { Component } from '@angular/core';
import {trigger, style, state, transition, animate} from "@angular/core"



@Component({
    selector: 'home',
    animations:[
        trigger('footerTransition', [
            state('in', style({transform: 'translateY(0%)'}) ),
            transition(':enter', [
                style({transform: 'translateY(100%)'}),
                animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
            ]),
            transition(':leave', [
                style({transform: 'translateY(0%)'}),
                animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
            ])
        ])
    ],
    template: `
        <div id="app">
            <div class="app-content">
                <sidebar></sidebar>
                <app-header></app-header>
                <div class="main-content">
                    <div class="wrap-content container" id="container">
                        <router-outlet></router-outlet>
                    </div>
                </div>
            </div>
            <!-- start: FOOTER -->
            <footer [@footerTransition]="">
                <div class="footer-inner">
                    <div class="pull-left">
                        &copy; <span class="current-year"></span><span class="text-bold text-uppercase">ClipTheme</span>. <span>All rights reserved</span>
                    </div>
                    <div class="pull-right">
                        <span class="go-top"><i class="ti-angle-up"></i></span>
                    </div>
                </div>
            </footer>
            <!-- end: FOOTER -->
            <aside></aside>
            <setting></setting>    
        </div>
    `
})

export class HomeComponent { }






export * from '../dashboard/dashboard.component';