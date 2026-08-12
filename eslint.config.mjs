import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      'storybook-static/',
      '.storybook/',
      'tailwind.config.js',
      'plop-templates/',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    rules: {
      eqeqeq: 'error',
      yoda: 'error',
      curly: 'error',
      semi: ['error', 'never'],
      'no-else-return': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'no-undef-init': 'error',
      'no-lonely-if': 'error',
      'no-unneeded-ternary': 'error',
      'no-confusing-arrow': 'error',
      'no-extra-semi': 'error',
      'dot-notation': 'error',
      // `export * as X from './m'` builds a namespace object, so when `m`'s
      // value is a default export it reaches consumers as `X.default` rather
      // than as `X`. Bundlers and Tailwind's config loader paper over that with
      // default interop; plain ESM does not, so it fails only in consumer
      // builds. Barrels here re-export named bindings with a plain `export *`,
      // so nothing needs the namespace form — `eslint-disable-next-line` is the
      // escape hatch if a genuine namespace re-export ever comes up.
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportAllDeclaration[exported]',
          message:
            'Avoid `export * as X` — it exposes a namespace object, not the module value. Give the module a named export and re-export it with `export *`.',
        },
      ],
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
        URL: 'readonly',
      },
    },
  },
)
