module.exports = function (grunt) {
  'use strict';
  
  grunt.initConfig({
    
    clean: {
      dist: ['css/*', 'js/*']
    },
    
    concat: {
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/js/*.js',
          'assets/js/*.js',
          'assets/js/**/*.js'
        ],
        dest: 'js/main.js'
      }
    },
    
    uglify: {
      dist: {
        files: {
          'js/main.min.js': 'js/main.js'
        }
      }
    },
    
    less: {
      dev: {
        files: {
          'css/main.css': [
            'assets/less/import.less',
            'assets/css/*.css'
          ]
        },
        options: {
          compress: false,
          sourceMap: true,
          sourceMapFilename: 'css/main.css.map',
          sourceMapRootpath: '/'
        }
      },
      build: {
        files: {
          'css/main.min.css': [
            'assets/less/import.less',
            'assets/css/*.css'
          ]
        },
        options: {
          compress: true,
          soureMap: false
        }
      }
    },
    
    autoprefixer: {
      options: {
        browsers: [
          "Android 2.3",
          "Android >= 4",
          "Chrome >= 20",
          "Firefox >= 24",
          "Explorer >= 8",
          "iOS >= 6",
          "Opera >= 12",
          "Safari >= 6"
        ]
      },
      dev: {
        options: {
          map: {
            prev: 'css/'
          }
        },
        src: 'css/main.css'
      },
      build: {
        src: 'css/main.min.css'
      }
    },
    
    watch: {
      less: {
        files: [
          'assets/less/*.less',
          'assets/less/**/*.less',
          'assets/css/*.css',
          'assets/css/**/*.css'
        ],
        tasks: ['less:dev', 'autoprefixer:dev']
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
  
  grunt.registerTask('dev', ['clean', 'less:dev', 'autoprefixer:dev', 'concat'])
  grunt.registerTask('build', ['clean', 'less:build', 'autoprefixer:build', 'concat', 'uglify'])
  grunt.registerTask('default', ['dev'])
  
};