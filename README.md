# Vite + Vue 3 Options API preset

![CI/CD](https://github.com/DonnieRich/vue-3-options-preset/actions/workflows/node.js.yml/badge.svg?branch=master)
[![npm version](https://badge.fury.io/js/vue-3-options-preset.svg)](//npmjs.com/package/vue-3-options-preset)

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