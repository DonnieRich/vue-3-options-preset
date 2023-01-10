// const execa = require('execa');
const { prepareEnvironment } = require('@gmrchk/cli-testing-library');

const { config } = require('../../src/config/config.production');
const stubJson = require('../../src/stubs/package.json');
const baseJson = require('../__jsons__/base.json');

const { BASE_DIR, BASE_STUBS_DIR, JSON_FILE } = config.get();
const test = prepareEnvironment();

describe('e2e test vue-3-options-preset', () => {

    beforeEach(async () => {
        const { writeFile } = await test;

        await Promise.allSettled([
            writeFile(`.${JSON_FILE}`, JSON.stringify(baseJson)),

            writeFile(`${BASE_STUBS_DIR}${JSON_FILE}`, JSON.stringify(stubJson)),
            writeFile(`${BASE_STUBS_DIR}/App.vue`, 'Stub App.vue'),
            writeFile(`${BASE_STUBS_DIR}/general.scss`, 'SCSS NO BOOTSTRAP'),
            writeFile(`${BASE_STUBS_DIR}/general-bootstrap.scss`, 'SCSS WITH BOOTSTRAP'),
            writeFile(`${BASE_STUBS_DIR}/HelloWorld.vue`, 'Stub HelloWorld.vue'),
            writeFile(`${BASE_STUBS_DIR}/main.js`, 'Stub main.js'),

            writeFile(`${BASE_DIR}/vite.config.js`, '...'),
            writeFile(`${BASE_DIR}/App.vue`, '...'),
            writeFile(`${BASE_DIR}/style.css`, '...'),
            writeFile(`${BASE_DIR}/main.js`, '...'),
            writeFile(`${BASE_DIR}/components/HelloWorld.vue`, 'Original HelloWorld.vue'),
        ]);

    });

    afterEach(async () => {
        const { cleanup } = await test;
        await cleanup();
    })

    it("Should pass if the command is run, the scaffolding process is completed and package.json has updated devDependencies", async () => {

        const { readFile, execute, exists } = await test;
        const { code, stdout } = await execute('node', './cmd/index.js');

        expect(code).toBe(0);
        expect(stdout).toMatchSnapshot();

        expect(await exists(`${BASE_DIR}/style.css`)).toBe(false);
        expect(await exists(`${BASE_DIR}/styles/general.scss`)).toBe(true);
        expect(await readFile(`${BASE_DIR}/styles/general.scss`)).toBe('SCSS NO BOOTSTRAP');
        expect(await readFile(`${BASE_DIR}/vite.config.js`)).toBe('...');
        expect(await readFile(`.${JSON_FILE}`)).toMatchSnapshot();

    });

    it("Should pass if the command is run, the scaffolding process is completed and package.json has updated dependencies", async () => {

        const { readFile, execute, exists } = await test;
        const { code, stdout } = await execute('node', './cmd/index.js -b');

        expect(code).toBe(0);
        expect(stdout).toMatchSnapshot();

        expect(await exists(`${BASE_DIR}/style.css`)).toBe(false);
        expect(await exists(`${BASE_DIR}/styles/general.scss`)).toBe(true);
        expect(await readFile(`${BASE_DIR}/styles/general.scss`)).toBe('SCSS WITH BOOTSTRAP');
        expect(await readFile(`${BASE_DIR}/vite.config.js`)).toBe('...');
        expect(await readFile(`.${JSON_FILE}`)).toMatchSnapshot();

    });

    it("Should fail if the command is not run on a fresh installation of Vite and Vue 3", async () => {

        const { writeFile, readFile, removeFile, execute, exists } = await test;

        // Scaffolding for this specific test
        await removeFile(`${BASE_DIR}/style.css`)
        await writeFile(`${BASE_DIR}/styles/not-general.scss`, '...');
        await writeFile(`${BASE_DIR}/components/NotHelloWorld.vue`, 'Original NotHelloWorld.vue');

        const { code, stdout } = await execute('node', './cmd/index.js');

        expect(code).toBe(1);
        expect(stdout).toMatchSnapshot();

        expect(await exists(`${BASE_DIR}/styles/general.scss`)).toBe(false);
        expect(await readFile(`${BASE_DIR}/vite.config.js`)).toBe('...');

    });

});

