module.exports = function(grunt) 
{
	var sBanner = '/* ----------------------------------------------------------------------------- ' +
	'\n\n  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile' +
	'\n  Version <%= pkg.version %>' + 
	'\n  Copyright (c)<%= grunt.template.today("yyyy") %> Curious Solutions LLP and Neha Kadam' +
	'\n  http://curioussolutions.github.io/DateTimePicker' +
	'\n  https://github.com/CuriousSolutions/DateTimePicker' +
	'\n\n ----------------------------------------------------------------------------- */\n\n'


	// Project configuration.
	grunt.initConfig(
	{

		pkg: grunt.file.readJSON('package.json'),

		copy: {
		  	main: {
		    	expand: true,
		    	cwd: 'src/',
		    	src: '**',
		    	dest: 'dist'
		  	},
		},

		uglify: 
		{
			options: 
			{
				banner: sBanner
			},
			build: 
			{
				files:
				{
					'dist/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>.js'],
					'dist/<%= pkg.name %>-ltie9.min.js': ['src/<%= pkg.name %>-ltie9.js']
				}
			}
		},

		cssmin: 
		{
			options: 
			{
				banner: sBanner
			},
			build: 
			{
				files:
				{
					'dist/<%= pkg.name %>.min.css': ['src/<%= pkg.name %>.css'],
					'dist/<%= pkg.name %>-ltie9.min.css': ['src/<%= pkg.name %>-ltie9.css']
				}
			}
		},

		jshint: 
		{
			dist:
			{
				src: ['src/DateTimePicker.js']
			},

			options:
			{
				strict: false,

				curly: false,
			
      			eqeqeq: true,
      			eqnull: true,
      			browser: true,
				devel: true,
				//unused: true,
				//undef: true,
			
				globals: 
				{
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

		csslint:
		{
			dist:
			{
				src: ['src/DateTimePicker.css']
			},
			
			options:
			{
				"fallback-colors": false,
				"universal-selector": false,
				"box-sizing": false,
				"display-property-grouping": false
			}
			
		}

	});

 	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');

	// Default task(s).
  	grunt.registerTask('default', ['uglify', 'cssmin', 'copy']);
  	grunt.registerTask('lint', ['jshint', 'csslint']);
};