var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');

gulp.task('server', ['watch', 'build'], function() {
  browserSync({
    server: {
      baseDir: 'build'
    }
  });
});

gulp.task('build', function() {
  browserify({entries: ['./src/js/app.js']})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['build']);
  gulp.watch('./build/**', ['reload']);
  gulp.watch('./src/sass/*.scss', ['sass']);
});

gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task('sass', function() {
  gulp.src('src/sass/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./build/css'));
});

gulp.task('default', ['server']);
