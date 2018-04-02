module.exports = {
	env: {
		es6: true,
		browser: true,
	},
	extends: ['eslint:recommended', 'prettier'],
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['react', 'prettier'],
	rules: {
		strict: 0,
		'no-console': 0,
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
		'prettier/prettier': [
			'error',
			{
				printWidth: 80,
				singleQuote: true,
				trailingComma: 'all',
				bracketSpacing: true,
				jsxBracketSameLine: true,
				semi: false,
				useTabs: true,
				tabWidth: 4,
				parser: 'babylon',
			},
		],
	},
}
