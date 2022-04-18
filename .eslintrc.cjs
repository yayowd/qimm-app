/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        // Prettier: allow multi-lines here
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier',
    ],
    parserOptions: {
        ecmaVersion: '2022',
        sourceType: 'module',
    },
    env: {
        'vue/setup-compiler-macros': true,
        es2022: true,
    },
}
