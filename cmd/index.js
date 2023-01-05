#! /usr/bin/env node
const { removeCssFile } = require("../src/bin/removeCssFile");
const { copyStubFiles } = require("../src/bin/copyStubFiles");
const { addDependenciesToPackageJson } = require("../src/bin/addDependenciesToPackageJson");

//const env = process.env.NODE_ENV || 'development';
const { config } = require(`../src/config/config.production`);
const { BASE_DIR, BASE_STUBS_DIR, JSON_FILE } = config.get();

// Get the optional argv
const argv = process.argv.slice(2);

const init = async () => {

    try {
        let bootstrap = false;

        // all the commands run from the root
        await removeCssFile(BASE_DIR);

        if (argv[0] === '-b') {
            bootstrap = true;
        }

        await copyStubFiles(BASE_STUBS_DIR, BASE_DIR, bootstrap);

        await addDependenciesToPackageJson(`${BASE_STUBS_DIR}${JSON_FILE}`, `.${JSON_FILE}`, bootstrap);

        console.log('\x1b[36m%s\x1b[0m', '✅  Your Vue 3 project is now ready! Just run: npm install');
    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', `❌  Error! Cannot complete the scaffolding process. Error: ${err}`);
    }
};

init();