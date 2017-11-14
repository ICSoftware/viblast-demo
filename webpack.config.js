const path = require('path');

module.exports = {
	entry: './index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 100000
						}
					}
				]
			}
		]
	}
};