
var path = require('path');

module.exports = function(grunt) {

  grunt.initConfig({
    nodemon: {
      options: {
        cwd: path.join(__dirname, 'server'),
        ignore: ['node_modules/**', 'data/*']
      },
      dev: {
        script: 'app.js'
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

  grunt.registerTask('default', ['nodemon']);

}