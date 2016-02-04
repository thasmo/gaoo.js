// gulpfile.js

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var watch = {};
var helper = {
	error: $.notify.onError({
		title: '<%= error.plugin %>',
		message: '<%= error.message %>'
	}),

	success: function (task, message) {
		$.notify.logLevel(1);

		return $.notify({
			title: task,
			message: message || 'Task finished.',
			onLast: true
		});
	},

	watch: function(glob, tasks) {
		var hash = glob + tasks.join();

		if(!$.util.env.watch && !$.util.env.w || watch[hash]) {
			return;
		}

		watch[hash] = true;
		gulp.watch(glob, tasks);

		$.util.log(
			'Watching',
			'\'' + $.util.colors.cyan(glob) + '\'',
			'for tasks',
			'\'' + $.util.colors.cyan(tasks.join(',')) + '\'',
			'...'
		);
	}
};

// Default
gulp.task('default', function() {
	var name = 'Default';

	helper.watch('src/*.js', ['default']);

	return gulp.src('src/*.js')
		.pipe($.plumber(helper.error))
		.pipe($.xo({quiet: true}))
		.pipe($.uglify())
		.pipe($.rename({extname: '.min.js'}))
		.pipe(gulp.dest('dist/'))
		.pipe(helper.success(name));
});
