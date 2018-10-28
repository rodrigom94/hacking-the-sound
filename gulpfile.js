var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
var pug = require('gulp-pug');




gulp.task('sass', () => {
    return gulp.src('app/scss/styles.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/dist/styles'))
        .pipe(browserSync.stream());
});

gulp.task('minify-css', () => {
    return gulp.src('app/dist/styles/styles.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('app/dist/styles'))
});

gulp.task('pug', () =>
    gulp.src('app/pug/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('app/dist/'))
    .pipe(browserSync.stream())
);

gulp.task("watch", function() {
    gulp.watch("app/scss/styles.scss", gulp.series('sass')).on('change', browserSync.reload);
    gulp.watch("app/css/styles.css", gulp.series('minify-css')).on('change', browserSync.reload);;
    gulp.watch("app/pug/**/*.pug", gulp.series('pug')).on('change', browserSync.reload);;
    gulp.watch("app/dist/*.html").on('change', browserSync.reload);
    gulp.watch("app/dist/styles/*.css").on('change', browserSync.reload);
    gulp.watch("app/dist/scripts/*.js").on('change', browserSync.reload);
})

gulp.task('default',
    gulp.parallel("sass", "pug", "minify-css", function() {
        browserSync.init({
            server: "app/dist"
        });

    }, "watch"));