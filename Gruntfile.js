module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['build/'],

        copy: {
            stylesheets: {
                expand: true,
                cwd: 'app/assets/stylesheets/vendor/',
                src: ['**/*.css'],
                dest: 'build/assets/stylesheets/vendor/'
            },
            javascripts: {
                expand: true,
                cwd: 'app/assets/javascripts/',
                src: ['**/*.js'],
                dest: 'build/assets/javascripts/'
            },
            images: {
                expand: true,
                cwd: 'app/assets/images/',
                src: ['**/*.{gif,jpg,png,svg}'],
                dest: 'build/assets/images/'
            },
            html: {
                expand: true,
                cwd: 'app/',
                src: ['**/*.html'],
                dest: 'build/'
            }
        },

        sass: {
            stylesheets: {
                options: {
                    noCache: true,
                    sourcemap: 'none',
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'app/assets/stylesheets/',
                    src: ['**/*.scss'],
                    dest: 'build/assets/stylesheets/',
                    ext: '.css'
                }]
            }
        },

        connect: {
            server: {
                options: {
                    hostname: '0.0.0.0',
                    port: 1111,
                    base: 'build/',
                    livereload: false
                }
            }
        },

        watch: {
            options: {
                atBegin: true,
                livereload: false,
                spawn: false
            },
            stylesheets: {
                files: 'app/assets/stylesheets/**/*.scss',
                tasks: ['copy:stylesheets']
            },
            javascripts: {
                files: 'app/assets/javascripts/**/*.js',
                tasks: ['copy:javascripts']
            },
            images: {
                files: 'app/assets/images/**/*.{gif,jpg,png,svg}',
                tasks: ['copy:images']
            },
            html: {
                files: 'app/*.html',
                tasks: ['copy:html']
            },
            sass: {
                files: 'app/assets/stylesheets/**/*.scss',
                tasks: ['sass:stylesheets']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('dev', ['clean', 'connect', 'watch']);
    grunt.registerTask('default', ['clean', 'copy', 'sass']);
};
