module.exports = function (grunt) {

	grunt.initConfig({
		clean: {},
		copy: {},
		ts: {
			default: {
				tsconfig: true,
				options: {
					rootDir: ''
				}
			}
		},
		watch: {
			default: {
				files: ['src/**/*.ts'],
				tasks: ['default']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ts');

	grunt.registerTask('default', ['ts']);

};