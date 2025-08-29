import eslintConfigPrettier from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
      'bun.lockb'
      // Eliminé la cadena vacía ''
    ],
  },

  // Reglas para TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json' // Agregué project para reglas avanzadas de TS
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Reglas base recomendadas de TypeScript
      ...tsPlugin.configs.recommended.rules,
      
      // Tus reglas personalizadas
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_', 
        varsIgnorePattern: '^_' 
      }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-console': 'off',
      'eqeqeq': ['warn', 'smart'],
    },
  },
  eslintConfigPrettier
];