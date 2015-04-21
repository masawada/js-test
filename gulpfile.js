var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
  browserify({entries: ['./src/app.js']})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch('./src/*.js', ['build']);
});

gulp.task('default', ['watch']);
