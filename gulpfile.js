// https://github.com/gulpjs/gulp/tree/master/docs
var gulp = require('gulp');

var webpack = require('webpack');

// https://github.com/terinjokes/gulp-uglify
var uglify = require('gulp-uglify');

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/server-with-livereload-and-css-injection.md
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// https://github.com/floridoo/gulp-sourcemaps
var sourcemaps = require('gulp-sourcemaps');

// https://github.com/stevelacy/gulp-stylus
var stylus = require('gulp-stylus');

// https://www.npmjs.com/package/gulp-concat/
var concat = require('gulp-concat');

// https://www.npmjs.com/package/gulp-cssimport/
var cssimport = require("gulp-cssimport");

// https://www.npmjs.com/package/gulp-cssmin
var cssmin = require('gulp-cssmin');

// https://www.npmjs.com/package/gulp-just-replace/
var replace = require('gulp-just-replace');

// https://www.npmjs.com/package/gulp-rename/
var rename = require('gulp-rename');

gulp.task('pack_tingle_and_demo', function(cb) {
    webpack(require('./webpack.dev.js'), function (err, stats) {
        // 重要 打包过程中的语法错误反映在stats中
        console.log('webpack log:' + stats);
        if(err) cb(err);
        console.info('###### pack_tingle_and_demo done ######');
        cb();
    });
});

gulp.task('stylus_tingle', function(cb) {
    gulp.src(['./src/tingle.styl'])
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src'));
    console.info('###### stylus_tingle done ######');
    cb();
});

// 提取css文件的import的内容 && 合并文件
gulp.task("build_tingle_css", function(cb) {
    gulp.src(["src/tingle.css"])
        .pipe(cssimport({}))
        .pipe(concat('tingle.css'))
        .pipe(replace([{
            search: /\/\*#\ssourceMappingURL=([^\*\/]+)\.map\s\*\//g,
            replacement: '/* end for `$1` */\n'
        }]))
        // .pipe(cssmin())
        .pipe(gulp.dest("dist/"));
    console.info('###### build_tingle_css done ######');
    cb();
});

gulp.task('stylus_demo', function(cb) {
    gulp.src(['./demo/**/*.styl'])
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./demo'));
    console.info('###### stylus_demo done ######');
    cb();
});

gulp.task('reload_by_js', ['pack_tingle_and_demo'], function () {
    reload();
});

gulp.task('reload_by_component_css', ['stylus_tingle'], function () {
    reload();
});

gulp.task('reload_by_demo_css', ['stylus_demo'], function () {
    reload();
});

// 开发`Tingle component`时，执行`gulp develop` or `gulp d`
gulp.task('develop', [
    'pack_tingle_and_demo',
    'stylus_tingle',
    'stylus_demo'
], function() {
    browserSync({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(['src/**/*.js', 'demo/**/*.js'], ['reload_by_js']);

    gulp.watch('src/**/*.styl', ['reload_by_component_css']);

    gulp.watch('demo/**/*.styl', ['reload_by_demo_css']);
});



gulp.task('publish', [
    'pack_tingle_and_demo',
    'stylus_tingle',
    'build_tingle_css'
])


// 快捷方式
gulp.task('d', ['develop']);
gulp.task('p', ['publish']);







