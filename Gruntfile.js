module.exports = function(grunt){
    "use strict";

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({

        jshint: {
            files: ["ngApp/src/**/*.js"],
            options: {
                "curly": true,
                "eqeqeq": true,
                "undef": true,
                "unused": "vars",
                "esnext":true,
                "devel":true,
                "node":true,
                "noyield":true
            }
        },

        es6transpiler: {
            dist: {
                files: {
                    "dist/ng/app.trans.js": ["ngApp/src/**/*.js"]
                }
            }
        },

        regenerator: {
            options: {
                includeRuntime: true
            },
            dist: {
                files: {
                    "dist/ng/app.es5.js": "dist/ng/app.trans.js"
                }
            }
        },


        uglify: {
            main: {
                files: {
                    "dist/ng/app.min.js":["dist/ng/app.es5.js"]
                }
            },
            options: {
                mangle:{toplevel:true},
                sourceMap: true,
                sourceMapName: "app.js.map",
                sourceMapIncludeSources: true,
                compress:true
            }
        },

        watch: {
            all: {
                files:["app.js"],
                tasks:["jshint","es6transpiler","regenerator","uglify"],
                options:{
                    spawn:false
                }
            }
        }

    });


    grunt.registerTask("build", ["jshint","es6transpiler","regenerator","uglify", "watch"]);

};