const path = require('path');

module.exports = {
	entry: './index.js',
	devtool: 'inline-source-map',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
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
				test: require.resolve('./index.js'),
				use: [{
					loader: 'expose-loader',
					options: 'icsVideoJs'
				}]
			}
		]
	}
};