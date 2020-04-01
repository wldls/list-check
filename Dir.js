const DIR = {
	// HTML: "html",
	SRC: "src",
	DEST: "dist",
	// SERVER: "server",
	APP: "app",
	PORT: 3000
  };
  
  module.exports = {
	PATH: {
	  DIR: DIR, // 위에 생성한 DIR 변수를 대입
	  SRC: {
		JS: `${DIR.SRC}/js/*.js`,
		SCRIPT: `${DIR.SRC}/js/script/*.js`,
		CSS: `${DIR.SRC}/css/*.css`,
		CSSSCRIPT: `${DIR.SRC}/css/script/*.css`,
		HTML: `${DIR.SRC}/html/**/*.html`,
		IMG: `${DIR.SRC}/images/**/*`,
		// EJS: `${DIR.SRC}/html/**/*.ejs`,
		// SERVER: `${DIR.SERVER}/**/*.js`
	  },
	  DEST: {
		JS: `${DIR.DEST}/js`,
		SCRIPT: `${DIR.DEST}/js/script`,
		CSS: `${DIR.DEST}/css`,
		CSSSCRIPT: `${DIR.DEST}/css/script`,
		HTML: `${DIR.DEST}/html`,
		IMG: `${DIR.DEST}/images`,
		// EJS: `${DIR.DEST}/html`,
		// SERVER: `${DIR.APP}`
	  }
	}
  };
  