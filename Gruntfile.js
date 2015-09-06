module.exports = function(grunt) {

    var name, latest,
        bannerContent,
        tasks = {},
        buildMode,
        taskConfig,
        paths,
        destinationPathPrefix,
        destinationPathPrefixRailsApp;

    var SourceTree = (function() {

        var tree = [],
            build = "";

        return {

            set: function(treeArg) {

                tree = treeArg;

            },

            setBuild: function(buildArg) {

                build = buildArg;

            },

            getList: function(prefix, suffix) {

                var i, maxi = tree.length, branch,
                    j, maxj, dir,
                    list = [],
                    file;

                for (i = 0; i < maxi; i += 1) {

                    branch = tree[i];

                    dir = branch.dir;

                    dir = (dir === "") ? dir : (dir + "/");

                    maxj = branch.files.length;

                    for (j = 0; j < maxj; j += 1) {

                        file = branch.files[j];

                        if (file.inBuilds.indexOf(build) !== -1) {

                            list.push(prefix + dir + file.name + suffix);

                        }

                    }

                }

                return list;

            }

        };

    }());


    // 0. setup

    // 0.1. configure Grunt and set build mode

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        env: grunt.option('env')

    });

    buildMode = (grunt.option('env') === 'demo') ? 'demo' : 'full';

    // 0.2. get package name

    latest = '<%= pkg.name %>';

    if (buildMode === 'demo') {

        latest += '-light';

    }

    name = latest + '-v<%= pkg.version%>';

    // 0.3. set content for build file headings

    bannerContent = {

        full: '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
            ' *  Copyright: <%= pkg.author %>, 2014 */\n\n',

        demo: '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
            ' *  Developed by <%= pkg.author %>, 2014 */\n\n'

    }[buildMode];

    // 0.4. configure tasks

    tasks.minimal = ['jshint', 'concat'];

    tasks.basic = ['jshint', 'jsbeautifier', 'concat', 'uglify', 'copy'];

    tasks.withDocs = tasks.basic.concat(['jsdoc']);

    tasks.spec = ['jasmine'];

    // 0.5. build source tree

    // NOTE: files that start with capital letters contain constructors.
    //   all other files contain objects, modules or miscellaneous utility functions.
    //   exception is the NameSpace.js file

    SourceTree.setBuild(buildMode);

    SourceTree.set(require('./source_tree.js'));

    // for the demo mode, all source, spec and build files are transferret to the outside demo folder
    destinationPathPrefix = (buildMode === 'demo') ? '../ripsaw-demo/ripsaw-light-js/' : '';

    // additionally, a demo build is transferred to the rails folder
    destinationPathPrefixRailsApp = '../ripsaw-demo/ripsaw-rails/app/assets/javascripts/';

    paths = {

        source: {

            code: 'src/',
            spec: 'spec/app/'

        },

        destination: {

            code: destinationPathPrefix + 'src/',
            spec: destinationPathPrefix + 'spec/app/',
            codeBuild: destinationPathPrefix + 'build/',
            specBuild: destinationPathPrefix + 'spec/'

        }

    };


    // 1. lint code

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.config('jshint', {

        options: {

            trailing: true,
            eqeqeq: true

        },

        target: {

            src: ["src/**/*.js"]

        }

    });


    // 2. run test suite

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.config('jasmine', {

        pivotal: {

            src: 'build/ripsaw.js',
            options: {

                specs: [ 'spec/**/*.js' ]

            }

        }

    });


    // 3. beautify files

    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.config('jsbeautifier', {

        files: [ "src/**/*.js", "spec/app/**/*.js" ],
        options: {}

    });


    // 4. concatenate files for development release

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.config('concat', {

        options: {

            banner: bannerContent,
            separator: '\n\n\n\n\n/*     ~~~~~     */\n/* ~~~~~~~~~~~~~ */\n/*   ~~~~~~~~~   */\n\n\n'

        },

        // concatenate source
        src: {

            src: SourceTree.getList(paths.source.code, ".js"),//sourceFiles,
            dest: paths.destination.codeBuild + latest + '.js'//release.dev

        }

    });


    // 5. compress javascript

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.config('uglify', {

        options: {

            banner: bannerContent,
            sourceMapRoot: '../',
            sourceMap: paths.destination.codeBuild + latest + '.min.js.map',
            sourceMappingURL: latest + '.min.js.map'

        },

        target: {
            src: SourceTree.getList(paths.source.code, ".js"),
            dest: paths.destination.codeBuild + latest + '.min.js'
        }

    });


    // 6. create 'latest' releases that do not contain version numbers

    grunt.loadNpmTasks('grunt-contrib-copy');

    taskConfig = {

        development: {

            src: paths.destination.codeBuild + latest + '.js',
            dest: paths.destination.codeBuild + name + '.js'

        },

        minified: {

            src: paths.destination.codeBuild + latest + '.min.js',
            dest: paths.destination.codeBuild + name + '.min.js'

        },

        sourceMapMinified: {

            src: paths.destination.codeBuild + latest + '.min.js.map',
            dest: paths.destination.codeBuild + name + '.min.js.map'

        }

    };

    // if source and destination for sources is different, copy sources
    if (paths.source.code !== paths.destination.code) {

        taskConfig.code = {

            src:  SourceTree.getList(paths.source.code, '.js'),
            dest: destinationPathPrefix//paths.destination.code

        };

    }

    // if source and destination for specs is different, copy specs
    if (paths.source.spec !== paths.destination.spec) {

        taskConfig.specs = {

            src:  SourceTree.getList(paths.source.spec, 'Spec.js'),
            dest: destinationPathPrefix

        };

    }

    // copy new demo build into Rails folder
    if (buildMode === 'demo') {

        taskConfig.toRailsApp = {

            src: paths.destination.codeBuild + latest + '.js',
            dest: destinationPathPrefixRailsApp + latest + '.js'

        };

    }

    grunt.config('copy', taskConfig);


    // 7. jsdoc

    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.config('jsdoc', {

        dist: {

            src: [ paths.destination.codeBuild + latest + '.js' ],

            options: {

                destination: destinationPathPrefix + 'doc',
                configure: './node_modules/grunt-jsdoc/node_modules/jsdoc/conf.json',
                template: './node_modules/ink-docstrap/template'

            }

        }

    });


    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.config('gh-pages', {
        options: {
            base: 'gh-pages'
        },
        src: ['**']
    });

    grunt.registerTask('default', tasks.basic);
    grunt.registerTask('minimal', tasks.minimal);
    grunt.registerTask('with-docs', tasks.withDocs);
    grunt.registerTask('spec', tasks.spec);
    grunt.registerTask('gh-pages', [ 'gh-pages' ]);

};
