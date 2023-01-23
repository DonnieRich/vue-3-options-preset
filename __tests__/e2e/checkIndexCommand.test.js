const { prepareEnvironment } = require('@gmrchk/cli-testing-library');

const { config } = require('../../src/config/config.production');
const stubJson = require('../../src/stubs/package.json');
const baseJson = require('../__jsons__/base.json');

const { BASE_DIR, BASE_STUBS_DIR, JSON_FILE, COMPONENT_FOLDER } = config.get();
const test = prepareEnvironment();

describe('e2e test vue-3-options-preset', () => {

    beforeEach(async () => {
        const { writeFile } = await test;

        await Promise.allSettled([
            writeFile(`.${JSON_FILE}`, JSON.stringify(baseJson)),

            writeFile(`${BASE_STUBS_DIR}${JSON_FILE}`, JSON.stringify(stubJson)),
            writeFile(`${BASE_STUBS_DIR}/default/App.vue`, 'Stub App.vue'),
            writeFile(`${BASE_STUBS_DIR}/default/general.scss`, 'SCSS NO BOOTSTRAP'),
            writeFile(`${BASE_STUBS_DIR}/default/HelloWorld.vue`, 'Stub HelloWorld.vue'),
            writeFile(`${BASE_STUBS_DIR}/default/main.js`, 'Stub main.js'),
            writeFile(`${BASE_STUBS_DIR}/bootstrap/App.vue`, 'Stub App.vue WITH BOOTSTRAP'),
            writeFile(`${BASE_STUBS_DIR}/bootstrap/general.scss`, 'SCSS WITH BOOTSTRAP'),
            writeFile(`${BASE_STUBS_DIR}/bootstrap/HelloWorld.vue`, 'Stub HelloWorld.vue'),
            writeFile(`${BASE_STUBS_DIR}/bootstrap/main.js`, 'Stub main.js'),

            writeFile(`${BASE_DIR}/vite.config.js`, '...'),
            writeFile(`${BASE_DIR}/App.vue`, '...'),
            writeFile(`${BASE_DIR}/style.css`, '...'),
            writeFile(`${BASE_DIR}/main.js`, '...'),
            writeFile(`${BASE_DIR}${COMPONENT_FOLDER}/HelloWorld.vue`, 'Original HelloWorld.vue'),
        ]);

    });

    afterEach(async () => {
        const { cleanup } = await test;
        await cleanup();
    });

    it("Should pass if the command is run, the scaffolding process is completed and package.json has updated devDependencies", async () => {

        const { readFile, execute, exists } = await test;
        const { code, stdout, stderr } = await execute('node', `./cmd/index.js`);

        console.log(stderr);

        // check for execution code
        expect(code).toBe(0);

        // check for console log messages
        expect(stdout).toMatchSnapshot();

        // check for CSS and SCSS files
        expect(await exists(`${BASE_DIR}/style.css`)).toBe(false);
        expect(await exists(`${BASE_DIR}/styles/general.scss`)).toBe(true);
        expect(await readFile(`${BASE_DIR}/styles/general.scss`)).toBe('SCSS NO BOOTSTRAP');

        // check for vite.config.js (should remain untouched)
        expect(await readFile(`${BASE_DIR}/vite.config.js`)).toBe('...');

        // check for package.json structure
        expect(await readFile(`.${JSON_FILE}`)).toMatchSnapshot();

    });

    it("Should pass if the command is run, the scaffolding process is completed and package.json has updated dependencies", async () => {

        const { readFile, execute, exists } = await test;
        const { code, stdout } = await execute('node', `./cmd/index.js -b`);

        // check for execution code
        expect(code).toBe(0);

        // check for console log messages
        expect(stdout).toMatchSnapshot();

        // check for CSS and SCSS files
        expect(await exists(`${BASE_DIR}/style.css`)).toBe(false);
        expect(await exists(`${BASE_DIR}/styles/general.scss`)).toBe(true);
        expect(await readFile(`${BASE_DIR}/styles/general.scss`)).toBe('SCSS WITH BOOTSTRAP');

        // check for App.vue file
        expect(await exists(`${BASE_DIR}/App.vue`)).toBe(true);
        expect(await readFile(`${BASE_DIR}/App.vue`)).toBe('Stub App.vue WITH BOOTSTRAP');

        // check for vite.config.js (should remain untouched)
        expect(await readFile(`${BASE_DIR}/vite.config.js`)).toBe('...');

        // check for package.json structure
        expect(await readFile(`.${JSON_FILE}`)).toMatchSnapshot();

    });

    it("Should fail if the command is not run on a fresh installation of Vite and Vue 3", async () => {

        const { writeFile, readFile, removeFile, execute, exists } = await test;

        // Scaffolding for this specific test
        await removeFile(`${BASE_DIR}/style.css`);
        await writeFile(`${BASE_DIR}/styles/not-general.scss`, '...');
        await writeFile(`${BASE_DIR}${COMPONENT_FOLDER}/NotHelloWorld.vue`, 'Original NotHelloWorld.vue');

        const { code, stdout } = await execute('node', `./cmd/index.js`);

        // check for execution code
        expect(code).toBe(1);

        // check for console log messages
        expect(stdout).toMatchSnapshot();

        // check for SCSS file (should be missing)
        expect(await exists(`${BASE_DIR}/styles/general.scss`)).toBe(false);

        // check for vite.config.js (should remain untouched)
        expect(await readFile(`${BASE_DIR}/vite.config.js`)).toBe('...');

    });

    it("Should fail if the stubs for Bootstrap are missing", async () => {

        const { removeFile, execute } = await test;

        // Scaffolding for this specific test
        await removeFile(`${BASE_STUBS_DIR}/bootstrap/App.vue`);
        await removeFile(`${BASE_STUBS_DIR}/bootstrap/general.scss`);
        await removeFile(`${BASE_STUBS_DIR}${JSON_FILE}`);
        await removeFile(`${BASE_STUBS_DIR}/bootstrap/HelloWorld.vue`);
        await removeFile(`${BASE_STUBS_DIR}/bootstrap/main.js`);

        const { code, stdout } = await execute('node', `./cmd/index.js -b`);

        // check for execution code
        expect(code).toBe(1);

        // check for console log messages
        expect(stdout).toMatchSnapshot();

    });

    it("Should fail if the stubs are missing", async () => {

        const { removeFile, execute } = await test;

        // Scaffolding for this specific test
        await removeFile(`${BASE_STUBS_DIR}/default/App.vue`);
        await removeFile(`${BASE_STUBS_DIR}/default/general.scss`);
        await removeFile(`${BASE_STUBS_DIR}${JSON_FILE}`);
        await removeFile(`${BASE_STUBS_DIR}/default/HelloWorld.vue`);
        await removeFile(`${BASE_STUBS_DIR}/default/main.js`);

        const { code, stdout } = await execute('node', './cmd/index.js');

        // check for execution code
        expect(code).toBe(1);

        // check for console log messages
        expect(stdout).toMatchSnapshot();

    });

    it("Should pass if the command is run on the vue-latest scaffolding structure", async () => {

        const { writeFile, readFile, execute, exists } = await test;

        writeFile(`${BASE_DIR}${COMPONENT_FOLDER}/AnotherComponent`, 'Original AnotherComponent.vue');
        writeFile(`${BASE_DIR}${COMPONENT_FOLDER}/AgainAnotherComponent`, 'Original AgainAnotherComponent.vue');
        writeFile(`${BASE_DIR}${COMPONENT_FOLDER}/icons/MyIcon.vue`, 'Original MyIcon.vue');
        writeFile(`${BASE_DIR}${COMPONENT_FOLDER}/icons/AnotherIcon.vue`, 'Original AnotherIcon.vue');

        const { code, stdout } = await execute('node', `./cmd/index.js -b`);

        // check for execution code
        expect(code).toBe(0);

        // check for console log messages
        expect(stdout).toMatchSnapshot();

        // check for CSS and SCSS files
        expect(await exists(`${BASE_DIR}/style.css`)).toBe(false);
        expect(await exists(`${BASE_DIR}/styles/general.scss`)).toBe(true);
        expect(await readFile(`${BASE_DIR}/styles/general.scss`)).toBe('SCSS WITH BOOTSTRAP');

        // check for Vue components files
        expect(await exists(`${BASE_DIR}${COMPONENT_FOLDER}/AnotherComponent.vue`)).toBe(false);
        expect(await exists(`${BASE_DIR}${COMPONENT_FOLDER}/icons/MyIcon.vue`)).toBe(false);
        expect(await exists(`${BASE_DIR}${COMPONENT_FOLDER}/icons/AnotherIcon.vue`)).toBe(false);
        expect(await exists(`${BASE_DIR}${COMPONENT_FOLDER}/HelloWorld.vue`)).toBe(true);
        expect(await readFile(`${BASE_DIR}${COMPONENT_FOLDER}/HelloWorld.vue`)).toBe('Stub HelloWorld.vue');

        // check for App.vue
        expect(await exists(`${BASE_DIR}/App.vue`)).toBe(true);
        expect(await readFile(`${BASE_DIR}/App.vue`)).toBe('Stub App.vue WITH BOOTSTRAP');

        // check for vite.config.js (should remain untouched)
        expect(await readFile(`${BASE_DIR}/vite.config.js`)).toBe('...');

        // check for final package.json structure
        expect(await readFile(`.${JSON_FILE}`)).toMatchSnapshot();

    });
});
