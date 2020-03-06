var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'none',
  entry: './index.js',
  devtool: 'cheap-eval-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
	rules: [
		// scss
		// {
		// 	test: /\.scss$/,
		// 	use: ['css-loader', 'sass-loader']
		// }
		{
			test: /\.css$/,
			use: [
				{ loader : MiniCssExtractPlugin.loader },
				'css-loader'
			]
		}
	]
  },
	devServer: {
		// publicPath: '/',
		// contentBase: path.join(__dirname, 'dist'),	
	    // compress: true,
		port: 3000,
		hot: true,
		open: true
	},
  plugins: [
	new HtmlWebpackPlugin({
		template: './src/html/index.html'
	}),
	new MiniCssExtractPlugin()
	// new webpack.ProgressPlugin(),
  ]
};

// var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = { 
// 	mode: 'none',
// 	entry: './src/index.js',
// 	output:{
// 		filename: 'bundle.js',
// 		path: path.resolve(__dirname, 'dist'),
// 	},
//   devServer: {
// 		// publicPath: '/',
// 		// contentBase: path.join(__dirname, 'dist'),	
// 	    // compress: true,
// 		port: 3000,
// 		// hot:true,
// 		open:true
// 	},
// 	plugins: [
//     new HtmlWebpackPlugin({
//       // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
//       template: './src/index.html',
//     }),
//   ],
// };