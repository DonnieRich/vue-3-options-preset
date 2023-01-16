const { vol } = require("memfs");
jest.mock("fs/promises");

const { cleanupScaffolding } = require("../../src/bin/cleanupScaffolding");
const { fileOperations } = require("../../src/bin/fileOperations");

// import all json config files
const { config } = require('../../src/config/config.test');
const { BASE_DIR, COMPONENT_FOLDER, EXTENSIONS } = config.get();

// preparing the mock modules
let mockRemoveFile;

describe(cleanupScaffolding, () => {
    beforeEach(() => {
        vol.reset();
        mockRemoveFile = jest.spyOn(fileOperations, "removeFile");
    });

    afterEach(() => {
        mockRemoveFile.mockRestore();
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

        await cleanupScaffolding([`${BASE_DIR}/styles`, `${BASE_DIR}${COMPONENT_FOLDER}`], EXTENSIONS);

        // check how many calls to mockRemoveFile
        expect(mockRemoveFile).toHaveBeenCalledTimes(4);

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

        await cleanupScaffolding([`${BASE_DIR}`, `${BASE_DIR}${COMPONENT_FOLDER}`], EXTENSIONS);

        // check calls to mockRemoveFile
        expect(mockRemoveFile).toHaveBeenNthCalledWith(1, BASE_DIR, ".css");
        expect(mockRemoveFile).toHaveBeenNthCalledWith(2, BASE_DIR, ".vue");
        expect(mockRemoveFile).toHaveBeenNthCalledWith(3, `${BASE_DIR}${COMPONENT_FOLDER}`, ".css");
        expect(mockRemoveFile).toHaveBeenNthCalledWith(4, `${BASE_DIR}${COMPONENT_FOLDER}`, ".vue");

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

        // check how many calls to mockRemoveFile
        expect(mockRemoveFile).toHaveBeenCalledTimes(6);

        expect(vol.toJSON()).toEqual(json)
    });

});