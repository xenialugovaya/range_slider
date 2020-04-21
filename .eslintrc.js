module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended', 
        'plugin:fsd/all',
    ],   
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module'
    },
    plugins: ['fsd'],
    rules: {
      'import/extensions': 'off'
    },
    settings: {
      'import/resolver': {
        'node': {
          'extensions': ['.js', '.ts',]
        }
      }
    }
  };