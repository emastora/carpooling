const gulp = require('gulp');
const browserify = require('browserify');
const responsive = require('gulp-responsive-images');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const resizer = require('gulp-image-resize');
const webp = require('gulp-webp');
const nodemon = require('gulp-nodemon');
var cssMin = require('gulp-css');
var minifyjs = require('gulp-js-minify');

gulp.task("images", function(cb1) {
    gulp.src('src/public/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 })
        ]))
        // .pipe(webp())
        .pipe(gulp.dest("src/public/buildTool/img"));
    cb1();
});

// gulp.task('styles', function(cb) {
//     gulp.src('src/public/css/*.css')
//         .pipe(sourcemaps.init())
//         .pipe(sass().on('error', sass.logError))
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions']
//         }))
//         .pipe(concat('main.css'))
//         .pipe(minifyCSS())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('buildTool/css'))
//         .pipe(browserSync.reload({ stream: true }));
//     cb();
// });

gulp.task('styles', function(cbt) {
    gulp.src('src/public/css/*.css')
        .pipe(cssMin())
        .pipe(gulp.dest('src/public/buildTool/css'));
    cbt();
});

gulp.task('scripts', function(cbj) {
    gulp.src('src/public/js/*.js')
        .pipe(minifyjs())
        .pipe(gulp.dest('src/public/buildTool/js'));
    cbj();
});

// gulp.task('scripts', function(cb2) {
//     gulp.src('src/public/js/*.js')
//         .pipe(sourcemaps.init())
//         .pipe(babel({
//             presets: ['env']
//         }))
//         .pipe(uglify())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('buildTool/js'))
//         .pipe(browserSync.reload({ stream: true }));
//     cb2();
// });

// gulp.task('browser-sync', function() {
//     const config = {
//         server: "src/server.js",
//         https: true,
//         port: process.env.PORT || 3000
//     };

//     return browserSync(config);
// });

gulp.task('serve', function(nodi) {
    nodemon({
            script: 'src/server.js',
        })
        .on('restart', function() {
            console.log('restarted');
        })
    nodi();
});

// gulp.task('default', gulp.series('images', 'styles', 'scripts', 'watch', 'browser-sync'));
gulp.task('default', gulp.series('images', 'styles', 'scripts', 'serve'));

// gulp.task('watch', function() {
//     gulp.watch('src/public/js/*.js', 'scripts');
//     gulp.watch('src/public/images/**/*', 'images');
//     gulp.watch('src/public/css/**/*.css', 'styles');
//     gulp.watch('./**/*.html', function() {
//         return gulp.src('')
//             .pipe(browserSync.reload({ stream: true }))
//     });
// });