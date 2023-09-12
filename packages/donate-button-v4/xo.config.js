const deepMerge = require('deepmerge');

const parentConfig = require('../../xo.config');

module.exports = deepMerge(parentConfig, {
	extends: ['xo-react'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/prefer-read-only-props': 'off',
		'react/prop-types': 'off',
		'capitalized-comments': 'off',
		'unicorn/filename-case': 'off'
	}
});
