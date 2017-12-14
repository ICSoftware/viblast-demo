const path = require('path');

module.exports = {
	entry: {
		demo: './index-video-frame.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		watchContentBase: true,
		host: '0.0.0.0'
	},
	module: {
		rules: [
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 100000
					}
				}]
			},
			{
				test: require.resolve('./VideoFrame.js'),
				use: ['script-loader']
			},
			{
				test: require.resolve('./index-video-frame.js'),
				use: [{
					loader: 'expose-loader',
					options: 'icsVideoFrame'
				}]
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	resolve: {
		alias: {
			// Required for videojs-contrib-hls to work with webpack
		    webworkify: 'webworkify-webpack-dropin'
		}
	}
};
