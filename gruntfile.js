/*
	gruntfile.js
	------------
*/

module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks('sassdown');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass_globbing: {
            your_target: {
              files: {
                 'assets/styles/main.scss': ['assets/styles/vendor/*.scss', 'assets/styles/settings/*', 'assets/styles/tools/*', 'assets/styles/base/*', 'assets/styles/objects/*', 'assets/styles/components/*','assets/styles/trumps/*']
         
              },
              options: {
                useSingleQuotes: false,
                signature: '// Main.scss - grunt generated'
              }
            }
          },
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    "assets/styles/main.css": "assets/styles/main.scss"
                }
            }
        },
        
        sassdown: {
            styleguide: {
                options: {
                    assets: [
                      'assets/styles/main.css',
                      'js/dist/styleguidejs.js'

                    ],
                    template: 'templates/styleguide-template.hbs',
                    highlight: 'monokai'
                },

                files: [{
                    expand: true,
                    cwd: 'assets/styles/',
                    src: [
                        'base/*.scss',
                        'components/*.scss',
                        'objects/*.scss',
                        'trumps/*.scss'
                    ],
                    dest: 'styleguide/'
                }]
            }
        },

        // Runs through distribution CSS file and add vendor prefixers where necessary (overwriting original)
        postcss: {
            default: {
                options: {
                    map: true,
                    processors: [
                        require('autoprefixer')({ browsers: ['ie 9','last 2 versions'] })
                    ]
                },
                dist: {
                    src: 'assets/styles/main.css'
                }
            },

            styleguidecss: {
                options: {
                    map: true,
                    processors: [
                        require('autoprefixer')({ browsers: ['ie 9','last 2 versions'] })
                    ]
                },
                src: 'assets/styles/styleguide/styleguide.scss',
                dest: 'assets/styles/styleguide.css'
                
            }
        },
        // HTML Bake - Templating Utility
        bake: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'templates/bake-views/',
                    src: ['**/*.htm'],
                    dest: 'templates/dist/',
                    ext: '.htm'
                }]
            }
        },
        // HTML Lint
        htmllint: {
            all: {
                options: {
                    ignore: ['The "date" input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.','Attribute "color" not allowed on element "link" at this point.', 'Bad value "mask-icon" for attribute "rel" on element "link": The string "mask-icon" is not a registered keyword.']
                },
                src: ["templates/dist/**/*.htm"]
            }
        },
        // Bower - For initial project start up. Download files from GitHub and move them to where we want them
        bowercopy: {
            options: {
                 clean: true
            },
            css: {
                options: {
                    destPrefix: 'assets/styles/'
                },
                files: {
                    'settings/_settings.reset.scss': 'normalize-css/normalize.css',
                    'vendor/_slick.scss': 'slick-carousel/slick/slick.scss',
                    'vendor/susy/': 'susy/sass/',
                    'vendor/_mq.scss': 'sass-mq/_mq.scss'
                }
            },
            js: {
                options: {
                    destPrefix: 'js/dev/'
                },
                files: {
                    'lib/jquery.min.js': 'jquery/dist/jquery.min.js',
                    'vendor/slick.js': 'slick-carousel/slick/slick.js',
                    'vendor/enquire.js': 'enquire/dist/enquire.js',
                    'vendor/js.cookie.js': 'js-cookie/src/js.cookie.js'
                }
            }
        },
        //Modernizr custom build
        modernizr: {
           dist: {
               "dest": "js/dev/lib/modernizr.js",
               "parseFiles": true,
               "customTests": [],
               "devFile": false,
               "tests": [
                //Add tests here
               ],
               "options": [
                 "setClasses"
               ],
               "uglify": true,

               "files": {
                   "src": [
                       'js/dev/mando/*.js',
                       'assets/styles/**/*.css'
                   ]
               },
           }
       },
        // Minify SVG
        svgmin: {
            dist: {
                options: {
                    plugins: [
                    // Don't remove XML declaration (needed to avoid errors creating PNG on Win 7)
                    { cleanupAttrs: true },
                    { cleanupEnableBackground: true },
                    { cleanupIDs: true },
                    { cleanupNumericValues: true },
                    { collapseGroups: true },
                    { convertColors: true },
                    { convertPathData: true },
                    { convertShapeToPath: true },
                    { convertStyleToAttrs: true},
                    { convertTransform: true },
                    { mergePaths: true },
                    { moveElemsAttrsToGroup: true },
                    { moveGroupAttrsToElems: true },
                    { removeComments: true },
                    { removeDoctype: true },
                    { removeEditorsNSData: true },
                    { removeEmptyAttrs: true },
                    { removeEmptyContainers: true },
                    { removeEmptyText: true },
                    { removeHiddenElems: true },
                    { removeMetadata: true },
                    { removeNonInheritableGroupAttrs: true },
                    { removeRasterImages: false }, //Keep raster images with the svg
                    { removeTitle: true },
                    { removeUnknownsAndDefaults: true },
                    { removeUnusedNS: true },
                    { removeUselessStrokeAndFill: false }, //Enabling this may case small details to be removed
                    { removeViewBox: false }, //I keep the view box because that's where illustrator hides the SVG dimensions
                    { removeXMLProcInst: false }, //Enabling this breaks grunticon because it removes the XML header
                    { sortAttrs: true },
                    { transformsWithOnePath: false }, //Enabling this breaks Illustrator SVGs with complex text?
                    ]
                },
                files: [{
                    expand: true,
                    cwd: 'assets/icons/raw',
                    src: ['*.svg'],
                    dest: 'assets/icons/minified'
                }]
            }
        },
        // Grunticon
        grunticon: {
            myIcons: {
                files: [{
                    expand: true,
                    cwd: 'assets/icons/minified',
                    src: ['*.svg', '*.png'],
                    dest: "assets/icons/output"
                }],
                options: {
                    enhanceSVG: true,
                    cssprefix: '.icon-'
                }
            }
        },
        // Concat Javacript Files
        concat: {
            vendorjs: {
                src: ['js/dev/vendor/*.js'],
                dest: 'js/dist/vendor.js'
            },
            mandojs: {
                src: ['js/dev/mando/**/*.js', 'js/dev/init.js'],
                dest: 'js/dist/mando.js'
            },
            styleguidejs: {
            src: ['js/dev/lib/modernizr.js','js/dev/lib/jquery.min.js','js/dev/vendor/*.js', 'js/dev/mando/**/*.js', 'js/dev/init.js'],
            dest: 'js/dist/styleguidejs.js'
          },
        },
        // Uglify - minify all the javascript files together
        uglify: {
            my_target: {
                options: {
                    sourceMap: true
                },
                files: {
                    'js/dist/vendor.min.js': 'js/dist/vendor.js',
                    'js/dist/mando.min.js': 'js/dist/mando.js'
                }
            }
        },
        // Checks if js in valid
        jshint: {
            files: ['js/dev/mando/**/*.js' ],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        // Watch script keeps an eye on the files listed running the corresponding tasks when a change is detected
        watch: {
            css: {
                files: ['assets/styles/**/*.scss'],
                tasks: ['sass_globbing','sass', 'postcss:default','modernizr'],
                options: {
                    nospawn: true
                }
            },
            svggubbins: {
                files: ['assets/icons/raw/*.svg'],
                tasks: ['svgmin', 'grunticon:myIcons'],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: ['js/dev/mando/**/*.js','js/dev/vendor/**/*.js','js/dev/init.js'],
                tasks: ['concat', 'uglify', 'jshint','modernizr']
            },
            bake: {
                files: ['templates/bake-views/**/*.htm', 'templates/bake-includes/**/*.htm','templates/bake-components/**/*.htm'],
                tasks: ['bake:build', 'htmllint']
            },
            sassdown: {
                files: ['assets/styles/**/*.scss'],
                tasks: ['sassdown'],
            }
        },
        // Favicon
        realFavicon: {
            favicons: {
                src: 'assets/img/favicon/favicon-master.png',
                dest: 'assets/img/favicon',
                options: {
                    iconsPath: '/assets/img/favicon',
                    html: [ 'templates/bake-components/page_head.htm' ],
                    design: {
                        ios: {
                            pictureAspect: 'backgroundAndMargin',
                            backgroundColor: '#ffffff',
                            margin: '14%'
                        },
                        windows: {
                            pictureAspect: 'noChange',
                            backgroundColor: '#ffffff',
                            onConflict: 'override'
                        },
                        androidChrome: {
                            pictureAspect: 'backgroundAndMargin',
                            margin: '17%',
                            backgroundColor: '#ffffff',
                            themeColor: '#ffffff',
                            manifest: {
                                name: 'NWG',
                                display: 'browser',
                                orientation: 'notSet',
                                onConflict: 'override'
                            }
                        },
                        safariPinnedTab: {
                            pictureAspect: 'silhouette',
                            themeColor: '#5bbad5'
                        }
                    },
                    settings: {
                        compression: 2,
                        scalingAlgorithm: 'Mitchell',
                        errorOnImageTooSmall: false
                    }
                }
            }
        }
    });
    // ===================================================
    // TASK DEFINITIONS
    // ===================================================
    grunt.registerTask('default', ['realFavicon', 'bowercopy','sass_globbing','sass', 'postcss:default', 'bake', 'concat', 'uglify', 'modernizr', 'svgmin', 'grunticon:myIcons']);
    grunt.registerTask('dev', ['sass_globbing','sass', 'postcss:default', 'bake', 'sassdown', 'htmllint', 'jshint', 'watch']);
    grunt.registerTask('styleguide', ['sass_globbing','sass', 'postcss:styleguidecss','concat:styleguidejs','sassdown']);
};
