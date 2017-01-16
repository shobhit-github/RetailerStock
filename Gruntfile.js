

module.exports = function(grunt){
    "use strict";

    require("load-grunt-tasks")(grunt);

    var root = __dirname;

    grunt.initConfig({

        jshint: {
            files: ["ngApp/app.min.js"],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },

        concat: {
            ng: {
                src: ['ngApp/src/**/*.js'],
                dest: 'ngApp/app.min.js'
            }
        },

        comments: {
            js: {
                options: { singleline: true, multiline: true },
                src: [ 'ngApp/app.min.js' ]
            }
        },

        minifyPolymer: {
            default: {
                files: {
                    'ngApp/app.min.js': 'ngApp/app.min.js'
                }
            }
        }



    });


        grunt.registerTask("build", ["concat", "comments", "minifyPolymer"]);

};