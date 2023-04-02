module.exports = (api) => {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				require.resolve('babel-plugin-module-resolver'),
				{
					alias: {
						'@components': './src/components',
						'@screens': './src/components/screens',
						'@helpers': './src/helpers',
						'@images': './src/assets/images',
						'@context': './src/context',
						'@hooks': './src/hooks',
						'@constants': './src/constants'
					}
				}
			]
		]
	}
}
