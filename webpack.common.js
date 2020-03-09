const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {
  mode: 'none',
	entry: './src/js/index.js',
	// entry: { main: "./index.js", library: ["jquery" , "lodash"] },
	// devtool: 'cheap-eval-source-map',
	output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
			}
		],
	},  
  plugins: [
		new webpack.DefinePlugin({}),
		new webpack.ProgressPlugin(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin(),
		// new HtmlWebpackPlugin({
		// 	template: './src/html/index.html',
		// }),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	]
};