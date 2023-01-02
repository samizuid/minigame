module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:prettier/recommended',
  ],
  plugins: ['react-hooks', 'testing-library', 'import'],
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
      rules: {
        'testing-library/no-node-access': 0,
        'testing-library/render-result-naming-convention': 0,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // TODO: Fix no-unused-variable on all components
    'no-unused-variable': [
      0,
      { ignoreRestSiblings: true, argsIgnorePattern: '^_' },
    ],
    // 'no-unused-variable': [
    //   1,
    //   {
    //     vars: 'all',
    //     args: 'after-used',
    //     ignoreRestSiblings: true,
    //     argsIgnorePattern: '^_',
    //   },
    // ],

    'no-var': 2,
    'no-unused-vars': 0,
    'no-console': [1, { allow: ['info', 'warn', 'error'] }],
    indent: 'off',
    semi: 0,
    'no-restricted-globals': 0,
    'prefer-const': 2,
    'eol-last': 2,

    'react/prop-types': 0,
    'react/display-name': 0,
    'react/no-find-dom-node': 0,
    'react/react-in-jsx-scope': 0,

    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-extra-semi': 0,
    '@typescript-eslint/no-use-before-define': 0,

    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-console': 0,
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        args: 'none',
        caughtErrors: 'none',
      },
    ],
    'no-trailing-spaces': 2,
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'import/no-duplicates': 2,
    'import/named': 0,
    'max-params': [1, 4],
    'newline-after-var': 2,
    'newline-before-return': 2,
    'react/no-unused-state': 2,
    'react/no-unknown-property': 2,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
}
