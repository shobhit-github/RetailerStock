/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

    // System loader how to load when no filename and/or no extension
    const ngPackages = [ 'core', 'animations', 'common', 'compiler', 'platform-browser', 'platform-browser-dynamic', 'http', 'router', 'forms', 'upgrade', 'router-deprecated'];

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {
            main: 'main.js',
            defaultExtension: 'js'
        },
        'rxjs': {
            defaultExtension: 'js'
        },
        'angular2-in-memory-web-api': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        '@chart': {
            main: 'chart.js',
            defaultExtension: 'js'
        },
        'primeng':{
            main: 'index.js',
            defaultExtension: 'js'
        }

    };


    ngPackages.forEach(function (pkgUmd) {
       packages[pkgUmd] = { main: pkgUmd, defaultExtension:'js' };
    });


    System.config({

        // paths serve as alias
        paths: {
            "npm:": "node_modules/"
        },

        // map tells the System loader where to look for things
        map: {
            "app": "dist", // 'dist', our app is within the dist folder
            'rxjs': "npm:rxjs",

            "@chart": "npm:chart.js/src",
            "@angular": "npm:@angular",

            "angular2-in-memory-web-api": "npm:angular2-in-memory-web-api",
            "primeng": "npm:primeng",

            // angular bundles
            '@angular/core': 'https://unpkg.com/@angular/core/bundles/core.umd.js',
            '@angular/animations': 'https://unpkg.com/@angular/animations/bundles/animations.umd.js',
            '@angular/common': 'https://unpkg.com/@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'https://unpkg.com/@angular/compiler/bundles/compiler.umd.js',
            '@angular/http': 'https://unpkg.com/@angular/http/bundles/http.umd.js',
            '@angular/forms': 'https://unpkg.com/@angular/forms/bundles/forms.umd.js',
            '@angular/router': 'https://unpkg.com/@angular/router/bundles/router.umd.js',
            '@angular/platform-browser': 'https://unpkg.com/@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'https://unpkg.com/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/animations/browser': 'https://unpkg.com/@angular/animations/bundles/animations-browser.umd.js',
            '@angular/platform-browser/animations': 'https://unpkg.com/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            '@angular/cdk': 'https://unpkg.com/@angular/cdk/bundles/cdk.umd.js'
        },


        packages:packages
    });


})(this);
