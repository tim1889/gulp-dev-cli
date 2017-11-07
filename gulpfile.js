var  gulp = require('gulp'),
concat = require('gulp-concat'),
minifyCss = require('gulp-minify-css'),
uglify = require('gulp-uglify'),
htmlmin = require('gulp-htmlmin'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant'),
cache = require('gulp-cache')
rev = require('gulp-rev'),//添加时间戳
revCollector = require('gulp-rev-collector');

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

gulp.task('js', function (done) {
  return gulp.src(config.input.js)
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest(config.output.js))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev/js'));
});

gulp.task('css', function () {
  return gulp.src(config.input.css)
    .pipe(minifyCss())
    .pipe(rev())    
    .pipe(gulp.dest(config.output.css))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev/css'));
});

gulp.task('img', function () {
  return gulp.src(config.input.img)
      .pipe(cache(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      })))
      .pipe(gulp.dest('dist/img'));
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

gulp.task('default',function(){
  gulp.run('img', 'js','css','rev');
  // gulp.run('watch');
});