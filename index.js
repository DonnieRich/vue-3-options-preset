#! /usr/bin/env node
const { removeCssFile } = require("./src/bin/removeCssFile");
const { copyStubFiles } = require("./src/bin/copyStubFiles");
const { addDependenciesToPackageJson } = require("./src/bin/addDependenciesToPackageJson");

const BASE_DIR = './src';
const BASE_STUBS_DIR = './node_modules/vue-3-options-preset/src/stubs';

// Get the optional argv
const argv = process.argv.slice(2);

const init = async () => {
    let bootstrap = false;

    // all the commands run from the root
    await removeCssFile(BASE_DIR);

    if (argv[0] === '-b') {
        bootstrap = true;
        //await npmInstallBootstrap();
    }

    //await npmInstallSass();
    await copyStubFiles(BASE_STUBS_DIR, BASE_DIR, bootstrap);

    await addDependenciesToPackageJson(`${BASE_STUBS_DIR}/package.json`, `./package.json`, bootstrap);

    console.log('\x1b[36m%s\x1b[0m', '✅  Your Vue 3 project is now ready! Just run: npm install');
};

init();