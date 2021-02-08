module.exports = {
	prettier: true,
	rules: {
		'unicorn/no-array-callback-reference': ['off'],
		'func-names': ['off'],
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					'../*',
					'./*',
					'fp-ts/lib/*',
					'fp-ts/es6/*',
					'io-ts/lib/*',
					'io-ts/es6/*',
					'io-ts-types/lib/*',
					'io-ts-types/es6/*'
				]
			}
		],
		'import/order': [
			'warn',
			{
				pathGroups: [
					{
						pattern: 'test/**',
						group: 'internal',
						position: 'after'
					},
					{
						pattern: 'src/**',
						group: 'internal'
					}
				],
				'newlines-between': 'always',
				alphabetize: {order: 'asc'}
			}
		],
		'no-else-return': 'warn'
	},
	overrides: [
		{
			files: 'webpack.config.js',
			settings: {'import/resolver': {node: {}}}
		}
	]
};
