

    module.exports = function(grunt) {

        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            concat: {
                options: {
                    separator: '|'
                },
                dist: {
                    src: ['ngApp/src/**/*.js'],
                    dest: 'ngApp/dist/script.js'
                }
            },
            uglify: {
                options: {
                 //   banner: '/*! <%= pkg.name %> <%= grunt.template.today() %> */\n'
                },
                dist: {
                    files: {
                        'ngApp/dist/script.min.js': ['ngApp/src/**/*.js']
                    }
                }
            },
            jshint: {
                // define the files to lint
                files: ['dist/script.js'],
                // configure JSHint
                options: {
                    // more options here if you want to override JSHint defaults
                    globals: {
                        jQuery: true
                    }
                }
            },
            babel: {
                compile: {
                    options: {
                        sourceMap: true,
                        presets: ['es2015']
                    },
                    files: ['dist/script.js']
                }
            },
            watch: {
                files: ['ngApp/src/**/*.js'],
                tasks: ['jshint']
            }
        });

        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-concat');

        grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'babel']);

    };
