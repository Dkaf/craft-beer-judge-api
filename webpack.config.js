var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: [
		'babel-polyfill',
		'./src/index'
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	target: 'node',
	externals: [nodeExternals()],
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: path.resolve(__dirname, 'node_modules'),
				include: path.resolve(__dirname, 'src')
			}
		]
	}
};