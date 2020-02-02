const path = require('path');
const webpack = require('webpack');
const paths = {
	root: path.join(__dirname, '/..'),
	scripts: path.join(__dirname, 'src/ts'),
	styles: path.join(__dirname, 'src/scss')
};

const jsModuleName = 'app';

module.exports = (env, argv) => {
	const { mode = 'development', hotReload = false } = argv || {};
	console.log('Webpack mode:', mode);

	let base = {
		mode,
		context: __dirname,
		entry: {
			[jsModuleName]: [
				path.join(paths.scripts, 'index.ts'),
				...mode === 'development' && hotReload ?
					[
						'webpack/hot/only-dev-server',
						'webpack-dev-server/client?localhost'
					]
					: []
			]
		},
		output: {
			filename: "[name].bundle.js",
			path: path.join(paths.root, '/dist/js')
		},
		resolve: {
			extensions: ['.js', '.json', '.ts', '.tsx']
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					loader: "awesome-typescript-loader",
					options: {
						configFileName: path.join(__dirname, 'tsconfig.json')
					}
				}
			]
		},
		plugins: [
			new webpack.NamedModulesPlugin()
		],
		optimization: {
			splitChunks: {
				chunks: "initial",
			}
		}
	}

	if (mode === 'development') {
		return {
			...base,
			output: {
				...base.output,
				publicPath: 'localhost'
			},
			plugins: [
				...base.plugins,
				new webpack.HotModuleReplacementPlugin()
			],
			devtool: 'source-map',
			watch: true,
			devServer: {
				contentBase: path.join(__dirname, '../'),
				compress: true,
				port: 8080,
				hot: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
					"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
				}
			}
		}
	} else {
		return base;
	}
}
