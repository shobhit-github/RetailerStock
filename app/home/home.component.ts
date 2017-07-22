


import { Component } from '@angular/core';


@Component({
    selector: 'home',
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
            <footer>
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

        <script src="public/js/index.js"></script>
        <script>
            jQuery(document).ready(function() {
                Main.init();
                Index.init();
            });
        </script>
        
    `
})

export class HomeComponent { }






export * from '../dashboard/dashboard.component';