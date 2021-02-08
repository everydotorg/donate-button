const config = {
	extensions: ['ts', 'tsx'],
	babel: {
		testOptions: {
			presets: ['@babel/preset-react']
		}
	},
	require: ['ts-node/register', 'tsconfig-paths/register']
};

export default config;
