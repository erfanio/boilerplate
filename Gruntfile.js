module.exports = function (grunt) {
  'use strict';
  
  grunt.initConfig({
    
    clean: {
      dist: ['css/main.min.css', 'css/main.min.css.map', 'js/main.min.js']
    },
    
    concat: {
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/js/*.js',
          'assets/js/*.js',
          'assets/js/**/*.js'
        ],
        dest: 'js/main.min.js'
      }
    },
    
    uglify: {
      dist: {
        files: {
          'js/main.min.js': 'js/main.min.js'
        }
      }
    },
    
    less: {
      dev: {
        files: {
          'css/main.min.css': [
            'assets/less/import.less'
          ]
        },
        options: {
          compress: false,
          sourceMap: true,
          sourceMapRootpath: '/',
          sourceMapURL: 'main.min.css.map'
        }
      },
      build: {
        files: {
          'css/main.min.css': [
            'assets/less/import.less'
          ]
        },
        options: {
          compress: true,
          soureMap: false,
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
          ]
        }
      }
    },
    
    watch: {
      less: {
        files: [
          'assets/less/*.less',
          'assets/less/**/*.less'
        ],
        tasks: ['less:dev']
      },
      js: {
        files: [
          'assets/js/*.js',
          'assets/js/**/*.js'
        ],
        tasks: ['concat']
      }
    }
  });
  
  
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  
  grunt.registerTask('dev', ['clean', 'less:dev', 'concat'])
  grunt.registerTask('build', ['clean', 'less:build', 'concat', 'uglify'])
  grunt.registerTask('default', ['dev'])
  
};