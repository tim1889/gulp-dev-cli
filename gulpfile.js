// import { request } from 'http';

var  gulp = require('gulp'),
concat = require('gulp-concat'),
minifyCss = require('gulp-minify-css'),
uglify = require('gulp-uglify'),
htmlmin = require('gulp-htmlmin'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant'),
cache = require('gulp-cache')
rev = require('gulp-rev'),//添加时间戳
revCollector = require('gulp-rev-collector'),
watch = require('gulp-watch'),
connect = require('gulp-connect');

var config = {
input: {
  html: ['src/*.html'],
  js: ['src/js/*.js'],
  css: ['src/css/*css'],
  img: ['src/img/*']
},
output: {
  dist: 'dist',
  js: 'dist/js',
  css: 'dist/css',
}
}

gulp.task('html', function () {
  return gulp.src(config.input.html)
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());

});

gulp.task('js', function (done) {
return gulp.src(config.input.js)
  .pipe(uglify())
  .pipe(rev())
  .pipe(gulp.dest(config.output.js))
  .pipe(rev.manifest())
  .pipe(gulp.dest('./rev/js'))
  .pipe(connect.reload());
});

gulp.task('css', function () {
return gulp.src(config.input.css)
  .pipe(minifyCss())
  .pipe(rev())    
  .pipe(gulp.dest(config.output.css))
  .pipe(rev.manifest())
  .pipe(gulp.dest('./rev/css'))
  .pipe(connect.reload());
});

gulp.task('img', function () {
return gulp.src(config.input.img)
    .pipe(cache(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'))
    .pipe(connect.reload());
});

gulp.task('rev', function() {
var options = {
  removeComments: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeEmptyAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyJS: true,
  minifyCSS: true
};
gulp.src(['./rev/**/*.json', 'src/*.html'])   
.pipe( revCollector({
  replaceReved: true,
  dirReplacements: {
      'css': 'css/',
      'js': 'js/'
    }
  }) 
)              
.pipe(revCollector())         
.pipe(htmlmin(options))  
.pipe(gulp.dest(config.output.dist));   
});

gulp.task('connect',function(){
connect.server({
  livereload: true
});
})

gulp.task('watch',function(){
gulp.watch(config.input.html, ['html']);
gulp.watch(config.input.js, ['js']);
gulp.watch(config.input.css, ['css']);
})

gulp.task('default',function(){
  /**压缩打包 */
// gulp.run('img', 'js', 'css', 'rev');
/**自动刷新 */
gulp.run('img', 'js', 'css','watch', 'connect');
});