const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {
  mode: 'none',
	entry: './src/js/index.js',
	// entry: { main: "./index.js", library: ["jquery" , "lodash"] },
  devtool: 'cheap-eval-source-map',
  output: {
    filename: '[name].js',
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
				process.env.NODE_ENV === 'production'
				? MiniCssExtractPlugin.loader	// prod
				: 'style-loader',	// dev
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
	optimization:{
		splitChunks:{
			chunks:'all'
		},
		minimizer: [
			new TerserJSPlugin({}),
			new OptimizeCSSAssetsPlugin({}),
		]
  },
  plugins: [		
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new HtmlWebpackPlugin({
			// index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
			template: './src/html/index.html',
			// minify: process.env.NODE_ENV === 'production' ? { 
			// 	collapseWhitespace: true, // 빈칸 제거 
			// 	removeComments: true, // 주석 제거 
			// } : false,
			// hash: true,	// 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가한다
		}),		
		new CleanWebpackPlugin(),
		new webpack.ProgressPlugin(),
		new webpack.DefinePlugin({}),
]
};