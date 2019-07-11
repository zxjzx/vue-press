# gulp

[[toc]]

## gulp如何使用
```javascript

const gulp = require('gulp');
const {series,task,src,dest,watch} = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify'); //用于压缩JS

const imageMin = require('gulp-imagemin');//用于压缩图片

const scss = require('gulp-sass');//编译css
const cssUglify = require('gulp-minify-css');//用于压缩css

//给文件添加版本号
const clean = require('gulp-clean') // 清空文件夹
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');


/**
 * 分割线
 */


function build(cb) {
  // body omitted
  console.log("build");
  cb();
}
exports.build = build;

function image(){
  return src('src/image/*.*')
    .pipe(imageMin({progressive:true}))
    .pipe(dest('output/image'));
}

function css(){
  return src('src/scss/*.scss')
    .pipe(concat('index.scss'))
    .pipe(scss())//编译
    .pipe(cssUglify())//压缩css
    .pipe(dest('output/css'))
}

function js(){
  return src('src/js/**/*.js')
    // .pipe(uglify())
    .pipe(concat('build.min.js'))
    // .pipe(uglify())
    .pipe(dest('output/js'))
}



//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
function revCss(){
  return src(['src/scss/*.scss','src/scss/*.css'])
    .pipe(concat('index.scss'))
    .pipe(scss())//编译
    .pipe(cssUglify())//压缩css
    .pipe(rev())
    .pipe(gulp.dest('output'))
    .pipe(rev.manifest())
    .pipe(dest('rev/css'))
}

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
function revJs(){
  return src('src/js/**/*.js')
    .pipe(concat('build.min.js'))
    // .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('output'))
    .pipe(rev.manifest())
    .pipe(dest('rev/js'))
}

//Html替换css、js文件版本
function revHtml() {
  return gulp.src(['rev/**/*.json', 'src/*.html'])
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(dest('output'));
};

// 清空dist文件夹
function cleanAll(){
  return src(['rev/*','output/*'])
    .pipe(clean())
}

exports.default = series(cleanAll,revJs,revCss,revHtml);



```
