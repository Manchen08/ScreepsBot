var jsTempDir = '.js_temp';

module.exports = function (grunt) {
	grunt.initConfig({
		clean: ['dist/**/*'],
		copy: {
			default: {
				src: [jsTempDir+'/**/*.js'],
				dest: 'dist/',
				expand: true,
				rename: function(dest, src) {
					var path = require('path');
					var newSrc = src.split('/').filter(function(dir) { return dir != jsTempDir }).join('.');

					return dest + newSrc;
				},
				options: {
					process: function(content, srcpath) {
						var newContent = content;
						newContent = newContent.replace(/require\("(?:\.+\/)(.*?)"\);/g, function(match, p1) {
							return 'require("./' + p1.replace(/\.\.\//g, '').replace(/\//g, '.') + '");';
						});

						return newContent;
					}
				}
			}
		},
		ts: {
			default: {
				outDir: jsTempDir,
				src: [
					"src/**/*.ts",
					"!typings",
					"!node_modules"
					],
				tsconfig: true
			}
		},
		screeps: {
			options: grunt.file.readJSON('screeps-config.json'),
			dist: {
				src: ['dist/*.js']
			}
		},
		watch: {
			default: {
				files: ['src/**/*.ts'],
				tasks: ['default']
			},
			deploy: {
				files: ['src/**/*.ts'],
				tasks: ['deploy']
			}
		}
	});

	grunt.loadNpmTasks('grunt-screeps');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ts');

	grunt.registerTask('default', ['clean', 'ts', 'copy']);
    grunt.registerTask('deploy', ['default', 'screeps']);


};