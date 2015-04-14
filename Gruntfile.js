module.exports = function(grunt) 
{
	var sBanner = '/* ----------------------------------------------------------------------------- ' +
	'\n\n  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile' +
	'\n  Version <%= pkg.version %>' + 
	'\n  Copyright (c)<%= grunt.template.today("yyyy") %> Curious Solutions Pvt Ltd and Neha Kadam' +
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
		}

	});

 	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task(s).
  	grunt.registerTask('default', ['uglify', 'cssmin', 'copy']);

};