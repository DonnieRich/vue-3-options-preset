# Vite + Vue 3 Options API preset

[![CI/CD](https://img.shields.io/github/actions/workflow/status/DonnieRich/vue-3-options-preset/node.js.yml)](//github.com/DonnieRich/vue-3-options-preset)
[![npm version](https://img.shields.io/npm/v/vue-3-options-preset)](//npmjs.com/package/vue-3-options-preset)
[![package size](https://img.shields.io/bundlephobia/min/vue-3-options-preset)](//npmjs.com/package/vue-3-options-preset)
[![license](https://img.shields.io/github/license/DonnieRich/vue-3-options-preset)](//github.com/DonnieRich/vue-3-options-preset/blob/master/LICENSE.md)
[![last commit](https://img.shields.io/github/last-commit/DonnieRich/vue-3-options-preset)](//github.com/DonnieRich/vue-3-options-preset)

This package update the default Vite + Vue 3 scaffolding installation:

- replacing the use of the *Composition API* with the *Options API*
- replacing *style.css* with *styles/general.scss*
- installing *SASS*
- **optional**: installing *Bootstrap*

## Installation

To install this package, run the following command in the terminal:

```
npm install --save-dev vue-3-options-preset
```

## Usage

After the installation, run the following command:

```
npx preset-options-api
```

To add Bootstrap along all the other options, add `-b` at the end of the command:

```
npx preset-options-api -b
```

## NOTE

Use this package only on new projects, right after Vite finished the scaffolding process!

### Credits

Badges from [shields.io](https://shields.io/)