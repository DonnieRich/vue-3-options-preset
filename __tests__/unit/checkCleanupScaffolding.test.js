const { vol } = require("memfs");
jest.mock("fs/promises");

const { cleanupScaffolding } = require("../../src/bin/cleanupScaffolding");
const { fileOperations } = require("../../src/bin/fileOperations");

// import all json config files
const { config } = require('../../src/config/config');
const { BASE_DIR, COMPONENT_FOLDER, EXTENSIONS, REMOVABLE_FOLDERS } = config.get();

// preparing the mock modules
let mockRemoveFile;
let mockRemoveEmptyFolders;

describe(cleanupScaffolding, () => {
    beforeEach(() => {
        vol.reset();
        mockRemoveFile = jest.spyOn(fileOperations, "removeFile");
        mockRemoveEmptyFolders = jest.spyOn(fileOperations, "removeEmptyFolders");
    });

    afterEach(() => {
        mockRemoveFile.mockRestore();
        mockRemoveEmptyFolders.mockRestore();
    });

    it("Should pass if all files matching EXTENSIONS have been removed", async () => {

        vol.fromJSON(
            {
                [`${BASE_DIR}/styles/style.css`]: "my style.css",
                [`${BASE_DIR}/styles/base.css`]: "my base.css",
                [`${BASE_DIR}/styles/logo.svg`]: "my logo.svg",
                [`${BASE_DIR}${COMPONENT_FOLDER}/FirstComponent.vue`]: "my FirstComponent.vue",
                [`${BASE_DIR}${COMPONENT_FOLDER}/SecondComponent.vue`]: "my SecondComponent.vue",
                [`${BASE_DIR}/main.js`]: "my main.js"
            },
            "/"
        );

        await cleanupScaffolding([`${BASE_DIR}/styles`, `${BASE_DIR}${COMPONENT_FOLDER}`], EXTENSIONS, REMOVABLE_FOLDERS);

        // check how many calls to mockRemoveFile
        expect(mockRemoveFile).toHaveBeenCalledTimes(4);
        expect(mockRemoveEmptyFolders).toHaveBeenCalledTimes(REMOVABLE_FOLDERS.length);

        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should pass if all files matching EXTENSIONS have been removed, except App.vue", async () => {

        vol.fromJSON(
            {
                [`${BASE_DIR}${COMPONENT_FOLDER}/FirstComponent.vue`]: "my FirstComponent.vue",
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

        expect(mockRemoveEmptyFolders).toHaveBeenCalledTimes(0);

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

        await cleanupScaffolding(['/', `${BASE_DIR}`, `${BASE_DIR}/assets`], EXTENSIONS, REMOVABLE_FOLDERS);

        // check how many calls to mockRemoveFile
        expect(mockRemoveFile).toHaveBeenCalledTimes(6);
        expect(mockRemoveEmptyFolders).toHaveBeenCalledTimes(1);

        expect(vol.toJSON()).toEqual(json)
    });

    it("Should pass if all files and the /icon folder are removed", async () => {

        const json = {
            [`${BASE_DIR}${COMPONENT_FOLDER}/FirstComponent.vue`]: "my FirstComponent.vue",
            [`${BASE_DIR}${COMPONENT_FOLDER}/SecondComponent.vue`]: "my SecondComponent.vue",
            [`${BASE_DIR}${COMPONENT_FOLDER}/icons/FirstIcon.vue`]: "my FirstIcon.vue",
            [`${BASE_DIR}${COMPONENT_FOLDER}/icons/SecondIcon.vue`]: "my SecondIcon.vue",
        };

        vol.fromJSON(
            json,
            "/"
        );

        await cleanupScaffolding(['/', `${BASE_DIR}`, `${BASE_DIR}${COMPONENT_FOLDER}`, `${BASE_DIR}${COMPONENT_FOLDER}/icons`], EXTENSIONS, REMOVABLE_FOLDERS);

        // check how many calls to mockRemoveFile
        expect(mockRemoveFile).toHaveBeenCalledTimes(8);

        expect(mockRemoveEmptyFolders).toHaveBeenNthCalledWith(1, REMOVABLE_FOLDERS[0]);

        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should pass if all files are removed, even if the icon folder is missing", async () => {

        const json = {
            [`${BASE_DIR}${COMPONENT_FOLDER}/FirstComponent.vue`]: "my FirstComponent.vue",
            [`${BASE_DIR}${COMPONENT_FOLDER}/SecondComponent.vue`]: "my SecondComponent.vue",
            [`${BASE_DIR}/main.js`]: "my main.js",
            [`/package.json`]: "my package.json",
            [`${BASE_DIR}/App.vue`]: "my App.vue",
        };

        vol.fromJSON(
            json,
            "/"
        );

        await cleanupScaffolding(['/', `${BASE_DIR}`, `${BASE_DIR}${COMPONENT_FOLDER}`, `${BASE_DIR}${COMPONENT_FOLDER}/icons`], EXTENSIONS, REMOVABLE_FOLDERS);

        // check how many calls to mockRemoveFile
        expect(mockRemoveFile).toHaveBeenCalledTimes(8);
        expect(mockRemoveEmptyFolders).toHaveBeenNthCalledWith(1, REMOVABLE_FOLDERS[0]);

        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should pass if cleanupScaffolding runs with empty params", async () => {

        await cleanupScaffolding([], [], []);

        // check how many calls to mockRemoveFile
        expect(mockRemoveFile).toHaveBeenCalledTimes(0);
        expect(mockRemoveEmptyFolders).toHaveBeenCalledTimes(0);
    });

    it("Should pass if cleanupScaffolding runs without params", async () => {

        await cleanupScaffolding();

        // check how many calls to mockRemoveFile
        expect(mockRemoveFile).toHaveBeenCalledTimes(0);
        expect(mockRemoveEmptyFolders).toHaveBeenCalledTimes(0);
    });

    it("Should pass if cleanupScaffolding runs only with EXTENSIONS param", async () => {

        await cleanupScaffolding([], EXTENSIONS);

        // check how many calls to mockRemoveFile
        expect(mockRemoveFile).toHaveBeenCalledTimes(0);
        expect(mockRemoveEmptyFolders).toHaveBeenCalledTimes(0);
    });

});