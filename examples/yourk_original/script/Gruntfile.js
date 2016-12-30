module.exports = function(grunt) {

    var name, latest,
        bannerContent,
        devRelease, minRelease,
        sourceMap, sourceMapUrl, lDevRelease, lMinRelease,
        lSourceMapMin, sourceFiles;

    sourceFiles = [

        'DCHISEL.js',
        'setup.js',
        'draw.js'

    ];

    latest = '<%= pkg.name %>';
    name = '<%= pkg.name %>-v<%= pkg.version%>';

    bannerContent = '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
        ' *  Copyright: <%= pkg.author %>, 2014 */\n\n';

    devRelease = 'build/' + name + '.js';
    minRelease = 'build/' + name + '.min.js';

    sourceMapMin = 'build/' + name + '.min.js.map';
    sourceMapUrl = name + '.min.js.map';

    lDevRelease = 'build/' + latest + '.js';
    lMinRelease = 'build/' + latest + '.min.js';
    lSourceMapMin = 'build/' + latest + '.min.js.map';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        copy: {

            development: {
                src: devRelease,
                dest: lDevRelease
            },

            minified: {
                src: minRelease,
                dest: lMinRelease
            },

            smMinified: {
                src: sourceMapMin,
                dest: lSourceMapMin
            }

        },


        uglify: {

            options: {

                banner: bannerContent,
                sourceMapRoot: '../',
                sourceMap: sourceMapMin,
                sourceMappingURL: sourceMapUrl

            },

            target: {
                src: sourceFiles,
                dest: minRelease
            }

        },


        concat: {

            options: {

                banner: bannerContent

            },

            target: {

                src: sourceFiles,
                dest: devRelease

            }

        },


        jshint: {

            options: {

                trailing: true,
                eqeqeq: true

            },

            target: {

                src: sourceFiles

            }

        },


        "jsbeautifier": {

            files: sourceFiles,
            options: {}

        }

    });

    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jsbeautifier', 'jshint', 'concat', 'uglify', 'copy']);

};
