#! /usr/bin/env node
const fs = require("node:fs/promises");
const path = require("node:path");

const shell = require('shelljs');

const { removeCssFile } = require("./src/bin/removeCssFile");
const { copyStubFiles } = require("./src/bin/copyStubFiles");

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
        await npmInstallBootstrap();
    }

    await npmInstallSass();
    await copyStubFiles(BASE_STUBS_DIR, BASE_DIR, bootstrap);

    console.log('\x1b[36m%s\x1b[0m', '✅  Your Vue 3 project is now ready!');
};

const npmInstallSass = async () => {

    console.log('\x1b[37m%s\x1b[0m', '✨  Installing SASS...');

    const result = shell.exec('npm add -D sass');

    if (result.code !== 0) {
        console.log('\x1b[31m%s\x1b[0m', `❌  Error! Cannot complete SASS installation. Exit code: ${result.code}`);
    } else {
        console.log('\x1b[36m%s\x1b[0m', '✅  SASS installation completed!');
    }

    return result.code;
}

const npmInstallBootstrap = async () => {
    console.log('\x1b[37m%s\x1b[0m', '✨  Installing Bootstrap...');

    const result = shell.exec('npm i --save bootstrap @popperjs/core');

    if (result.code !== 0) {
        console.log('\x1b[31m%s\x1b[0m', `❌  Error! Cannot complete Bootstrap installation. Exit code: ${result.code}`);
    } else {
        console.log('\x1b[36m%s\x1b[0m', '✅  Bootstrap installation completed!');
    }

    return result.code;
}

init();