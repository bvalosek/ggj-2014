module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      game: ['./game/**/*.{js,json}'],
      grunt: ['Gruntfile.js']
    },

    clean: { dist: { src: ['./dist'] } },

    copy: {
      public: {
        expand: true,
        cwd: './public',
        src: '**',
        dest: './dist'
      }
    },

    browserify: {
      game: {
        files: { './dist/main.js': ['./dist/main.js'] },
        options: { debug: true }
      }
    },

    watch: {
      game: {
        files: ['game/**/*.{js,json}'],
        tasks: ['build']
      },
      options: { livereload: 35729 }
    }

  });

  // plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
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
