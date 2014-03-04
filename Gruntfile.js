
var path = require('path');

module.exports = function(grunt) {

  grunt.initConfig({
    nodemon: {
      options: {
        cwd: path.join(__dirname, 'server'),
        ignore: ['node_modules/**', 'data/*', 'public/**/*']
      },
      dev: {
        script: 'app.js'
      }
    },

    compass: {
      dist: {
        options: {
          config: 'config/compass/config.rb'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');

  grunt.registerTask('css', ['compass']);

  grunt.registerTask('default', ['compass', 'nodemon']);

}