const path = require('path')
const webpack = require('webpack')
const _externals = require('externals-dependencies')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: {
		app: [
			path.resolve(__dirname, '../src/app.ts'),
		],
	},
	mode: 'production',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.ts'],
	},
	target: 'node',
	externals: _externals(),
	context: __dirname,
	node: {
		console: true,
		global: true,
		process: true,
		Buffer: true,
		__filename: true,
		__dirname: true,
		setImmediate: true,
		path: true,
	},
	module: {
		rules: [
			{
				test: /\.ts/,
				use: ['babel-loader', 'ts-loader'],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
			},
    }),
    // new CleanWebpackPlugin()
	],
}
