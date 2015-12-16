/*
	gruntfile.js
	------------
	Project Name:   	NWG
	------------
*/

module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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

        // Runs through distribution CSS file and add vendor prefixers where necessary (overwriting original)
        postcss: {
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
                    ignore: ['Attribute "color" not allowed on element "link" at this point.', 'Bad value "mask-icon" for attribute "rel" on element "link": The string "mask-icon" is not a registered keyword.']
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
                    'vendor/susy/': 'susy/sass/'
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
                }
            }
        },

        modernizr: {
            dist: {
                // [REQUIRED] Path to the build you're using for development.
                "devFile": "js/dev/lib/modernizr-latest.js",

                // Path to save out the built file.
                "outputFile": "js/dev/lib/modernizr.js",

                // When parseFiles = true, this task will crawl all *.js, *.css, *.scss and *.sass files,
                // except files that are in node_modules/.
                // You can override this by defining a "files" array below.
                "files": {
                    "src": [
                        'js/dev/mando/*.js',
                        'assets/styles/**/*.css',
                    ]
                },

                // This handler will be passed an array of all the test names passed to the Modernizr API, and will run after the API call has returned
                // "handler": function (tests) {},

                // When parseFiles = true, matchCommunityTests = true will attempt to
                // match user-contributed tests.
                "matchCommunityTests": false,

                // Have custom Modernizr tests? Add paths to their location here.
                "customTests": []
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
                tasks: ['sass', 'postcss','modernizr'],
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
                files: ['js/dev/mando/**/*.js'],
                tasks: ['concat', 'uglify', 'jshint','modernizr']
            },
            bake: {
                files: ['templates/bake-views/**/*.htm', 'templates/bake-components/**/*.htm'],
                tasks: ['bake:build', 'htmllint']
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

    grunt.registerTask('favicon', ['realFavicon']);
    grunt.registerTask('default', ['bowercopy','sass', 'postcss', 'bake', 'concat', 'uglify', 'modernizr', 'svgmin', 'grunticon:myIcons']);
    grunt.registerTask('dev', ['sass', 'postcss', 'bake', 'htmllint', 'concat', 'uglify', 'jshint', 'watch']);

};
