
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

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app_client/**/*.js'],
        dest: 'javascript/app.js'
      }
    },

    ember_templates: {
      options: {
        templateName: function(sourceFile) {
          return sourceFile.replace(/app_client\/templates\//, '');
        }
      },
      'javascript/templates.js': ['app_client/templates/**/*.hbs']
    },

    neuter: {
      options: {
        includeSourceUrl: true
      },
      'build/uncompressed/javascripts/header.js': 'javascript/header.js',
      'build/uncompressed/javascripts/footer.js': 'javascript/footer.js'
    },

    copyto: {
      javascript: {
        files: [{
          cwd: path.join(__dirname, 'build', 'uncompressed', 'javascripts'),
          src: ['**/*'],
          dest: ['server/public/javascripts/']
        }]
      },
      stylesheets: {
        files: [{
          cwd: path.join(__dirname, 'build', 'uncompressed', 'stylesheets'),
          src: ['**/*'],
          dest: ['server/public/stylesheets/']
        }]
      },
    },

    compass: {
      dist: {
        options: {
          config: 'config/compass/config.rb'
        }
      }
    },

    clean: {
      public: ['server/public/*'],
      build: ['build/*']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-copy-to');

  grunt.registerTask('css', ['compass']);

  grunt.registerTask('concat:javascript', ['concat:dist', 'ember_templates', 'neuter']);

  grunt.registerTask('publish:javascript', ['concat:javascript', 'copyto:javascript']);

  grunt.registerTask('publish:stylesheets', ['compass', 'copyto:stylesheets']);

  grunt.registerTask('publish', ['publish:javascript', 'publish:stylesheets']);

  grunt.registerTask('default', ['publish', 'nodemon']);

}