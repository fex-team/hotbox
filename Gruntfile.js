/* global require, module */

var path = require('path');

module.exports = function(grunt) {
    'use strict';

    // These plugins provide necessary tasks.
    /* [Build plugin & task ] ------------------------------------*/
    grunt.loadNpmTasks('grunt-module-dependence');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');

    var pkg = grunt.file.readJSON('package.json');

    var banner = '/*!\n' +
        ' * ====================================================\n' +
        ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * GitHub: <%= pkg.repository.url %> \n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
        ' * ====================================================\n' +
        ' */\n\n';

    var expose = '\nuse(\'expose\');\n';

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: pkg,

        // resolve dependence
        dependence: {
            options: {
                base: 'src',
                entrance: 'expose'
            },
            merge: {
                files: [{
                    src: 'src/*.js',
                    dest: 'hotbox.js'
                }]
            }
        },

        // concat
        concat: {
            closure: {
                options: {
                    banner: banner + '(function () {\n',
                    footer: expose + '})();'
                },
                files: {
                    'hotbox.js': ['hotbox.js']
                }
            }
        },

        uglify: {
            options: {
                banner: banner
            },
            minimize: {
                files: {
                    'hotbox.min.js': 'hotbox.js'
                }
            }
        },

        less: {
            dev: {
                files: {
                    'hotbox.css': [
                        'less/hotbox.less'
                    ]
                },
                options: {
                    sourceMap: true
                }
            },
            compile: {
                files: {
                    'hotbox.css': [
                        'less/hotbox.less'
                    ]
                },
                options: {
                    sourceMap: false
                }
            }
        },

        autoprefixer: {
            all: {
                src: 'hotbox.css',
                dest: 'hotbox.css'
            }
        },

        watch: {
            less: {
                files: ['less/*.less'],
                tasks: ['less:compile', 'autoprefixer']
            }
        }

    });


    // Build task(s).
    grunt.registerTask('default', ['dependence', 'concat', 'uglify', 'less', 'autoprefixer']);

};