// const execa = require('execa');
const { prepareEnvironment } = require('@gmrchk/cli-testing-library');

const { config } = require('../src/config/config.test');
const stubJson = require('../src/stubs/package.json');
const baseJson = require('./__jsons__/base.json');

const { BASE_DIR, BASE_STUBS_DIR, JSON_FILE } = config.get();
// const BASE_STUB_FILE = `${BASE_STUBS_DIR}${JSON_FILE}`;

describe('e2e test vue-3-options-preset', () => {
    // beforeEach(() => {
    //     vol.reset();
    // });

    it("It should pass if the command is run and package.json has updated devDependencies", async () => {

        const { makeDir, writeFile, readFile, execute, cleanup, path } = await prepareEnvironment();

        await writeFile(`.${JSON_FILE}`, JSON.stringify(baseJson));
        await makeDir(`.${BASE_STUBS_DIR}`);

        await writeFile(`.${BASE_STUBS_DIR}${JSON_FILE}`, JSON.stringify(stubJson));

        await writeFile(`.${BASE_STUBS_DIR}/App.vue`, 'Stub App.vue');
        await writeFile(`.${BASE_STUBS_DIR}/general.scss`, 'SCSS NO BOOTSTRAP');
        await writeFile(`.${BASE_STUBS_DIR}/HelloWorld.vue`, 'Stub HelloWorld.vue');
        await writeFile(`.${BASE_STUBS_DIR}/main.js`, 'Stub main.js');

        await makeDir(`.${BASE_DIR}`);
        await writeFile(`.${BASE_DIR}/App.vue`, '...');
        await writeFile(`.${BASE_DIR}/style.css`, '...');
        await writeFile(`.${BASE_DIR}/main.js`, '...');
        await makeDir(`.${BASE_DIR}/components`);
        await writeFile(`.${BASE_DIR}/components/HelloWorld.vue`, 'Original HelloWorld.vue');

        const content = await readFile(`.${BASE_STUBS_DIR}${JSON_FILE}`);
        console.log(content); // this will be file content
        console.log(path);

        const { code, stdout, stderr } = await execute('node', './cmd/index.js');

        expect(code).toBe(0);
        expect(stdout).toMatchSnapshot();
        //expect(stderr).toEqual('');

        //await cleanup();

        // // check the final snapshot
        // expect(vol.toJSON()).toMatchSnapshot();
    });

});
