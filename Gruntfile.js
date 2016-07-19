module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dev: {
                src: ['www/_assets/js/*.js', '!www/_assets/js/prototype.js', '!www/_assets/js/universities.js', '!www/_assets/js/hesa-codes.js', '!www/_assets/js/region-selector.js', '!www/_assets/js/scripts.js', '!www/_assets/js/scripts.min.js'],
                dest: 'www/_assets/js/scripts.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'www/_assets/js/scripts.min.js': ['www/_assets/js/scripts.js']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        modernizr: {
            dist: {
                // [REQUIRED] Path to the build you're using for development.
                "devFile": "www/_assets/js/vendor/modernizr-2.7.1.js",

                // [REQUIRED] Path to save out the built file.
                "outputFile": "www/_assets/js/vendor/modernizr-custom.js"
            }
        },
        sass: {
            dev: {
                options: {
                    includePaths: ['../csr-assets/scss'],
                    outputStyle: 'compressed',
                    sourceMap: true
                },
                files: {
                    'www/_assets/css/main.css': '../csr-assets/scss/main.scss',
                    'www/_assets/css/main-ie8.css': '../csr-assets/scss/main-ie8.scss'
                }
            }
        },
        assemble: {
            options: {
                flatten: false,
                expand: true,

                assets: 'www/_assets',

                layout: 'default.hbs',
                layoutdir: 'www/_templates/layouts',

                partials: ['www/_templates/partials/*.hbs']
            },

            dev: {
                files: [{
                    expand: true,
                    cwd: 'www/_templates/pages/',
                    src: '**/*.hbs',
                    dest: 'www/',
                    ext: '.html'
                }]
            }
        },
        watch: {
            options: {
                livereload: 34892,
                spawn: false
            },
            css: {
                files: ['../csr-assets/scss/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['www/_assets/js/**/*.js', '!www/_assets/js/scripts.min.js', '!www/_assets/js/scripts.js'],
                tasks: ['jshint', 'concat:dev']
            },
            hbs: {
                files: ['www/_templates/{,*/}*.hbs', 'www/_templates/{,*/*/}*.hbs', 'www/_templates/{,*/*/*/}*.hbs'],
                tasks: ['assemble']
            },
            html: {
                files: ['www/email.html']
            }
        },
        copy: {
          prototype: {
            files: [{
              expand: true,
              cwd: 'www',
              src: [
                '**/*',
                '!_assets/js/**/*',
                '!_templates/**/*',
                '!_assets/css/*.map',
                '_assets/js/vendor/**/*',
                '_assets/js/scripts.js',
                '_assets/js/universities.js',
                '_assets/js/hesa-codes.js',
                '_assets/js/gum/adapter.js',
                '_assets/js/gum/main.js',
                '_assets/js/region-selector.js',
                '_assets/js/prototype.js'
              ],
              dest: 'prototype/'
            }]
          },
          prod_assets: {
            expand: true,
            cwd: 'prototype/_assets/',
            src: [
                '**/*',
                '!scss',
                '!js/prototype.js',
                '!js/region-selector.js'
                ],
            dest: '../faststream-frontend/public/'
          },
          screenshots: {
            files: [{
              expand: true,
              cwd: 'screens/',
              src: ['**/*.png'],
              dest: '/Users/henrycharge/Google Drive/_CSR/Beta/Screenshots/',
              rename: function(dest, src) {
                var date = new Date();
                    now = "-" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getHours() + "-" + date.getMinutes();

                return dest + src.replace(/\.png$/, now + ".png");
              }
            }]
          },
          latestscreens: {
            files: [{
              expand: true,
              cwd: 'screens/',
              src: ['**/*.png'],
              dest: '/Users/henrycharge/Google Drive/_CSR/Beta/Screenshots/_latest'
            }]
          }
        },
        clean: {
          prototype: [
            "prototype/_assets/",
            "prototype/_templates/",
            "prototype/alt/",
            "prototype/faststream/",
            "prototype/inform/",
            "prototype/schemes/",
            "prototype/whitehall/",
            "prototype/admin/",
            "prototype/tests/",
            "prototype/offline/",
            "prototype/*.html"
          ]
        },
        replace: {
          map: {
            src: ['www/_assets/css/*.css'],
            overwrite: true,
            replacements: [{
                from: 'sourceMappingURL=main.css.map',
                to: 'Map removed'
            }, {
                from: 'sourceMappingURL=main-ie8.css.map',
                to: 'Map removed'
            }]
          },
          scripts: {
            src: ['www/apprentice/*.html', 'www/*.html'],
            overwrite: true,
            replacements: [{
                from: 'scripts.js',
                to: 'scripts.min.js'
            }]
          }
        },
        prettify: {
            options: {
                indent: 2,
                wrap_line_length: 78,
                brace_style: 'expand'
            },
            // Specify a number to padcomments
            prototype: {
                files: [{
                    expand: true,
                    cwd: 'prototype/',
                    src: ['alt/faststream/*.html', 'faststream/*.html', 'inform/*.html', 'schemes/*.html', 'whitehall/*.html', 'admin/*.html', 'tests/*.html', '*.html', '!pattern-library.html'],
                    dest: 'prototype/',
                    ext: '.html'
                }]
            }
        },
        localscreenshots: {
          desktop: {
            options: {
              path: 'screens',
              type: 'png',
              local : {
                  path: 'prototype',
                  port: 5000
              },
              viewport: ['1024x1024']
            },
            src: ['prototype/**/*.html']
          },
          mobile: {
            options: {
              path: 'screens-mob',
              type: 'png',
              local : {
                  path: 'prototype',
                  port: 5000
              },
              viewport: ['420x420']
            },
            src: ['prototype/**/*.html']
          }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'www/_assets/css/*.css',
                        'www/_assets/js/scripts.js',
                        'www/**/*.html'
                    ]
                },
                options: {
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        links: true,
                        forms: true
                    },
                    watchTask: true,
                    server: {
                        baseDir: "www"
                    }
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 7100,
                    base: 'www',
                    livereload: 34892,
                    open: true
                }
            }
        },
        buildcontrol: {
            options: {
                dir: 'prototype',
                commit: true,
                push: true,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            prototypeheroku: {
                options: {
                    remote: 'git@heroku.com:faststream-prototype.git',
                    branch: 'master'
                }
            },
            sprintheroku: {
                options: {
                    remote: 'git@heroku.com:faststream-sprint.git',
                    branch: 'master'
                }
            },
            local: {
                options: {
                remote: '../',
                branch: 'build'
                }
            }
        },
        banner: '/* \n' +
          ' * Copyright <%= grunt.template.today("yyyy") %> HM Revenue & Customs\n' +
          ' *\n' +
          ' * Licensed under the Apache License, Version 2.0 (the "License");\n' +
          ' * you may not use this file except in compliance with the License.\n' +
          ' * You may obtain a copy of the License at\n' +
          ' *\n' +
          ' *     http://www.apache.org/licenses/LICENSE-2.0\n' +
          ' *\n' +
          ' * Unless required by applicable law or agreed to in writing, software\n' +
          ' * distributed under the License is distributed on an "AS IS" BASIS,\n' +
          ' * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n' +
          ' * See the License for the specific language governing permissions and\n' +
          ' * limitations under the License.\n' +
          '*/ \n',
        usebanner: {
          dist: {
            options: {
              position: 'top',
              banner: '<%= banner %>',
              replace: true
            },
            files: {
              src: [ 'www/_assets/js/prototype.js' ]
            }
          }
        }
    });

    [
        'grunt-assemble',
        'grunt-banner',
        'grunt-modernizr',
        'grunt-contrib-uglify',
        'grunt-contrib-jshint',
        'grunt-sass',
        'grunt-contrib-concat',
        'grunt-text-replace',
        'grunt-contrib-watch',
        'grunt-contrib-copy',
        'grunt-contrib-clean',
        'grunt-contrib-compress',
        'grunt-browser-sync',
        'grunt-contrib-connect',
        'grunt-prettify',
        'grunt-build-control',
        'grunt-localscreenshots'
    ].forEach(function(task) {
        grunt.loadNpmTasks(task);
    });

    grunt.registerTask('images', ['imageoptim']);

    grunt.registerTask('modern', ['modernizr']);

    grunt.registerTask('dev', ['jshint', 'concat:dev', 'sass', 'assemble', 'connect', 'watch']);

    grunt.registerTask('sync', ['jshint', 'concat:dev', 'sass', 'assemble', 'browserSync', 'watch']);

    grunt.registerTask('proto', ['clean', 'replace:map', 'copy:prototype', 'prettify:prototype']);

    grunt.registerTask('assets', ['copy:prod_assets']);

    grunt.registerTask('deploy', ['buildcontrol:prototypeheroku']);

    grunt.registerTask('deploysprint', ['buildcontrol:sprintheroku']);

    grunt.registerTask('screens', ['localscreenshots:desktop', 'copy:screenshots', 'copy:latestscreens']);

    grunt.registerTask('screenshots', ['localscreenshots:desktop']);

    grunt.registerTask('mobilescreenshots', ['localscreenshots:mobile']);

    grunt.registerTask('addbanner', ['usebanner']);




};
