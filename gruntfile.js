module.exports = function (grunt) {
	grunt.initConfig({
		clean: ['dist/**/*', '.js_temp/**/*'],
		copy: {
			default: {
				cwd: '',
				src: ['.js_temp/**/*.js'],
				dest: 'dist',
				rename: function(dest, src) {
					// TODO: flatten out structure
					// var path = require('path');
					// var fileName = src.split(path.sep).slice(0, 1)[0];
					// return path.join(dest, fileName + '.' + path.basename(src));
				}
			}
		},
		ts: {
			default: {
				files: {'.js_temp': [
						"src/**/*.ts",
						"!typings",
						"!node_modules"
					]},
				tsconfig: true
			}
		},
		screeps: {
			options: grunt.file.readJSON('screeps-config.json'),
			dist: {
				src: ['dist/**/*.js']
			}
		},
		watch: {
			default: {
				files: ['src/**/*.ts'],
				tasks: ['default']
			}
		}
	});

	grunt.loadNpmTasks('grunt-screeps');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ts');

	grunt.registerTask('default', ['clean', 'ts', 'copy']);
};