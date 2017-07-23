/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

    // System loader how to load when no filename and/or no extension
    const ngPackages = [ 'core', 'common', 'compiler', 'platform-browser', 'platform-browser-dynamic', 'http', 'router', 'forms', 'upgrade', 'router-deprecated'];

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
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/forms/bundles/upgrade.umd.js',
            '@angular/router-deprecated': 'npm:@angular/forms/bundles/router-deprecated.umd.js'
        },


        packages:packages
    });


})(this);
