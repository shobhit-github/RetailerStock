/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'dist', // 'dist',
        '@angular': 'node_modules/@angular',
        'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
        'rxjs': 'node_modules/rxjs',
        '_guards': 'app/_shared/_guards',
        '_pipes': 'app/_shared/_pipes',
        'primeng': 'node_modules/primeng',
        '@chart': 'node_modules/chart.js/src',
        '_services': 'app/_shared/_services',
        '_elements': 'app/elements',
        '_models': 'app/_shared/_models'
    };
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
        '_guards':{
            main:'index.ts',
            defaultExtension: 'ts'
        },
        '_models':{
            main:'index.ts',
            defaultExtension: 'ts'
        },
        'primeng': {
            main: 'primeng.js',
            defaultExtension: 'js'
        },
        '_services':{
            main:'index.ts',
            defaultExtension: 'ts'
        },
        '@chart': {
            main: 'chart.js',
            defaultExtension: 'js'
        },
        '_pipes':{
            main:'index.ts',
            defaultExtension: 'ts'
        },
        '_elements':{
            main:'index.ts',
            defaultExtension: 'ts'
        }
    };
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade'
    ];

    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = {
            main: 'index.js',
            defaultExtension: 'js'
        };
    }

    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = {
            main: 'bundles/' + pkgName + '.umd.js',
            defaultExtension: 'js'
        };
    }

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);
