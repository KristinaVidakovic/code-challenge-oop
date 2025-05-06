const parser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettier = require('eslint-plugin-prettier');

module.exports = [
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: parser,
            parserOptions: {
                sourceType: 'module',
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            prettier,
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            'prettier/prettier': 'error',
        },
    },
];
