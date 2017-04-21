module.exports = function (grunt) {
	grunt.initConfig({
		clean: ['dist/**/*'],
		copy: {},
		ts: {
			default: {
				files: {'dist': [
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
				src: ['dist/*.js']
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

	grunt.registerTask('default', ['clean', 'ts']);
};