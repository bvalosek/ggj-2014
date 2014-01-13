module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      cgame: ['node_modules/cgame/**/*.js'],
      game: ['src/**/*.js', 'src/**/*.json'],
      grunt: ['Gruntfile.js']
    },

    clean: { bin: { src: ['./bin'] } },

    copy: {
      index: { src: 'src/index.html', dest: 'bin/index.html' },
      resources: {
        expand: true,
        cwd: 'src/resources',
        src: '**',
        dest: 'bin/resources'
      }
    },

    browserify: {
      game: {
        src: ['src/main.js'],
        dest: 'bin/main.js',
        options: { debug: true }
      }
    },

    watch: {
      game: {
        files: [
          'src/**/*.js',
          'src/**/*.json',
          'node_modules/cgame/**/*.js'
        ],
      },

      options: { livereload: 35729 }
    }
  });

  // plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');

  // Tasks
  grunt.registerTask('build', [
    'clean',
    'jshint',
    'copy',
    'browserify'
  ]);

  grunt.registerTask('default', ['build']);

};
