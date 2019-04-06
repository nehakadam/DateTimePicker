module.exports = function(grunt) 
{
	var sBanner = '/* ----------------------------------------------------------------------------- ' +
	'\n\n  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile' +
	'\n  Version <%= pkg.version %>' + 
	'\n  Copyright (c)2014-<%= grunt.template.today("yyyy") %> Lajpat Shah' +
	'\n  Contributors : https://github.com/nehakadam/DateTimePicker/contributors' +
	'\n  Repository : https://github.com/nehakadam/DateTimePicker' +
	'\n  Documentation : https://nehakadam.github.io/DateTimePicker' +
	'\n\n ----------------------------------------------------------------------------- */\n\n'


	// Project configuration.
	grunt.initConfig(
	{

		pkg: grunt.file.readJSON('package.json'),

		concat: {
			lang: {
	    	options: {
					separator: '\n\n\n\n',
		      stripBanners: true,
					banner: sBanner
				},
				
      	src: ['src/i18n/*', '!src/i18n/DateTimePicker-i18n.js'],
      	dest: 'src/i18n/DateTimePicker-i18n.js',
	     	nonull: true
	    }
		},

		copy: {
	  	main: {
	    	expand: true,
	    	cwd: 'src/',
	    	src: '**',
	    	dest: 'dist'
	  	},

	  	lang: {
	    	expand: true,
	    	cwd: 'src/i18n',
	    	src: '**',
	    	dest: 'dist/i18n'
	  	}
		},

		uglify: {
			options: {
				banner: sBanner,
				compress: {
			    drop_console: true
			  }
			},
			build: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>.js'],
					'dist/<%= pkg.name %>-ltie9.min.js': ['src/<%= pkg.name %>-ltie9.js']
				}
			}
		},

		cssmin: {
			options: {
				banner: sBanner
			},
			build: {
				files: {
					'dist/<%= pkg.name %>.min.css': ['src/<%= pkg.name %>.css'],
					'dist/<%= pkg.name %>-ltie9.min.css': ['src/<%= pkg.name %>-ltie9.css']
				}
			}
		},

		jshint: {
			dist: {
				src: ['src/DateTimePicker.js']
			},

			options: {
				strict: false,
				curly: false,
  			eqeqeq: true,
  			eqnull: true,
  			browser: true,
				devel: true,
				//unused: true,
				//undef: true,
			
				globals: {
					$: false,
    			jQuery: false,
    			define: false,
    			require: false,
    			module: false,
    			DateTimePicker: true
  			},

  			force: true
			}
		},

		csslint: {
			dist: {
				src: ['src/DateTimePicker.css']
			},
			
			options: {
				"fallback-colors": false,
				"universal-selector": false,
				"box-sizing": false,
				"display-property-grouping": false
			}
		}
	});

 	// Load the plugin that provides the "uglify" task.
 	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');

	// Default task(s).  
	// 
	grunt.registerTask('default', ['uglify', 'cssmin', 'copy']);
	grunt.registerTask('lang', ['concat:lang', 'copy:lang']);
	grunt.registerTask('lint', ['jshint', 'csslint']);
};