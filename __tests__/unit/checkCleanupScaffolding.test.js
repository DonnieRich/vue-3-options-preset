const { vol } = require("memfs");
jest.mock("fs/promises");

const { cleanupScaffolding } = require("../../src/bin/cleanupScaffolding");

// import all json config files
const { config } = require('../../src/config/config.test');
const { BASE_DIR, EXTENSIONS } = config.get();

describe(cleanupScaffolding, () => {
    beforeEach(() => {
        vol.reset();
    });

    it("Should pass if all files matching EXTENSIONS have been removed", async () => {

        vol.fromJSON(
            {
                [`${BASE_DIR}/styles/style.css`]: "my style.css",
                [`${BASE_DIR}/styles/base.css`]: "my base.css",
                [`${BASE_DIR}/styles/logo.svg`]: "my logo.svg",
                [`${BASE_DIR}/components/FirstComponent.vue`]: "my FirstComponent.vue",
                [`${BASE_DIR}/components/SecondComponent.vue`]: "my SecondComponent.vue",
                [`${BASE_DIR}/main.js`]: "my main.js"
            },
            "/"
        );

        await cleanupScaffolding([`${BASE_DIR}/styles`, `${BASE_DIR}/components`], EXTENSIONS);
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should pass if all files matching EXTENSIONS have been removed, except App.vue", async () => {

        vol.fromJSON(
            {
                [`${BASE_DIR}/components/FirstComponent.vue`]: "my FirstComponent.vue",
                [`${BASE_DIR}/main.js`]: "my main.js",
                [`${BASE_DIR}/style.css`]: "my style.css",
                [`${BASE_DIR}/App.vue`]: "my App.vue",
            },
            "/"
        );

        await cleanupScaffolding([`${BASE_DIR}`, `${BASE_DIR}/components`], EXTENSIONS);
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should pass if no files are removed", async () => {

        const json = {
            [`${BASE_DIR}/pages/HomePage.vue`]: "my HomePage.vue",
            [`${BASE_DIR}/assets/logo.svg`]: "my logo.svg",
            [`${BASE_DIR}/main.js`]: "my main.js",
            [`/package.json`]: "my package.json",
            [`${BASE_DIR}/App.vue`]: "my App.vue",
        };

        vol.fromJSON(
            json,
            "/"
        );

        await cleanupScaffolding(['/', `${BASE_DIR}`, `${BASE_DIR}/assets`], EXTENSIONS);
        expect(vol.toJSON()).toEqual(json)
    });

});