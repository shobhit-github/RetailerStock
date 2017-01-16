

module.exports = function(grunt){
    "use strict";

    require("load-grunt-tasks")(grunt);

    var root = __dirname;

    grunt.initConfig({

        jshint: {
            files: ["ngApp/app.js"],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },

        concat: {
            ng: {
                src: ['ngApp/src/**/*.js'],
                dest: 'ngApp/app.js'
            }
        },

        comments: {
            js: {
                options: { singleline: true, multiline: true },
                src: [ 'ngApp/app.js' ]
            }
        },

        minifyPolymer: {
            default: {
                files: {
                    'ngApp/app.js': 'ngApp/app.js'
                }
            }
        }



    });


        grunt.registerTask("build", ["concat", "comments", "minifyPolymer"]);

};