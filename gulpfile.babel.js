("use strict");

import gulp from "gulp";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import del from "del";
import browserSync from "browser-sync";
import DIR, { PATH } from "./Dir";

// js minify
gulp.task("js", () => {
  return (
    gulp
			.src(PATH.SRC.JS)		  
      .pipe(uglify())
			.pipe(rename({suffix:'.min'}))  // min네이밍으로 파일 생성						
      .pipe(gulp.dest(PATH.DEST.JS))
  );
});

// js script dist
gulp.task("js-script", () => {
  return (
    gulp
      .src(PATH.SRC.SCRIPT)
      .pipe(gulp.dest(PATH.DEST.SCRIPT))
  );
});

// css minify
gulp.task("css", () => {
  return (
    gulp
      .src(PATH.SRC.CSS)
      .pipe(concat('index.css')) // 병합
      .pipe(gulp.dest(PATH.DEST.CSS))
      .pipe(cleanCSS({ compatibility: "ie8" }))
      // .pipe(rename({suffix:'index.min.css'}))  // min네이밍으로 파일 생성
      .pipe(rename({ suffix: ".min" }))
      .pipe(gulp.dest(PATH.DEST.CSS))
  );
});

// js script dist
gulp.task("css-script", () => {
  return (
    gulp
      .src(PATH.SRC.CSSSCRIPT)
      .pipe(gulp.dest(PATH.DEST.CSSSCRIPT))
  );
});

// html minify
gulp.task("html", () => {
  return gulp
    .src(PATH.SRC.HTML)
    .pipe(gulp.dest(PATH.DEST.HTML));
});

// clean
gulp.task("clean", () => {
  return new Promise(resolve => {
    del.sync(['./dist/*']);
    resolve();
  });
});

gulp.task('reload', done => {
	browserSync.reload();
	done();
});

// 웹서버 실행
gulp.task('server', done => {
	browserSync.init({
    port: 3000,
		// 로컬서버
		server:{
			baseDir:'./',
			index:'src/html/index.html'
		},
		reloadDelay: 50,
    reloadDebounce: 250
	});
	done();
});

gulp.task("watch", () => {
  return new Promise(resolve => {
    gulp.watch(PATH.SRC.JS, gulp.series("js", 'reload'));
    gulp.watch(PATH.SRC.SCRIPT, gulp.series("js-script", 'reload'));
    gulp.watch(PATH.SRC.CSS, gulp.series("css", 'reload'));
    gulp.watch(PATH.SRC.CSSSCRIPT, gulp.series("css-script", 'reload'));
    gulp.watch(PATH.SRC.HTML, gulp.series("html", 'reload'));    
    resolve();
  });
});

gulp.task('default', gulp.series('clean', 'js', 'js-script', 'css', 'css-script', 'html', 'server', 'watch'));