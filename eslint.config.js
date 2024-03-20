import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  rules: {
    'react-refresh/only-export-components': 'off',
    'unused-imports/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 2,

    'import/order': [
      2,
      {
        'pathGroups': [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        'alphabetize': { order: 'asc', caseInsensitive: false },
        'newlines-between': 'always-and-inside-groups',
        'warnOnUnassignedImports': true,
      },
    ],
  },
})
