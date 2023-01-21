const { vol } = require("memfs");
jest.mock("fs/promises");

const { addDependenciesToPackageJson } = require("../../src/bin/addDependenciesToPackageJson");
const { jsonOperations } = require("../../src/bin/jsonOperations");

// import all json config files
const { config } = require('../../src/config/config');
const stubJson = require('../../src/stubs/package.json');
const baseJson = require('../__jsons__/base.json');
const updatedJsonBootstrap = require('../__jsons__/updatedJsonBootstrap.json');
const updatedJsonNoBootstrap = require('../__jsons__/updatedJsonNoBootstrap.json');

const BASE_FILE = config.get().JSON_FILE;
const BASE_STUB_FILE = `${config.get().BASE_STUBS_DIR}${BASE_FILE}`;

// preparing the mock modules
let mockGetJsonDataFromFile;
let mockMergeJsonObjects;
let mockWriteJsonDataToFile;

describe(addDependenciesToPackageJson, () => {
    beforeEach(() => {
        vol.reset();
        mockGetJsonDataFromFile = jest.spyOn(jsonOperations, "getJsonDataFromFile");
        mockMergeJsonObjects = jest.spyOn(jsonOperations, "mergeJsonObjects");
        mockWriteJsonDataToFile = jest.spyOn(jsonOperations, "writeJsonDataToFile");
    });

    afterEach(() => {
        mockGetJsonDataFromFile.mockRestore();
        mockMergeJsonObjects.mockRestore();
        mockWriteJsonDataToFile.mockRestore();
    });


    it("Should pass if the file package.json has been updated with the merged devDependencies", async () => {

        vol.fromJSON(
            {
                [BASE_FILE]: JSON.stringify(baseJson),
                [BASE_STUB_FILE]: JSON.stringify(stubJson)
            },
            '/'
        );

        await addDependenciesToPackageJson(BASE_STUB_FILE, BASE_FILE, false);

        // check calls to getJsonDataFromFile
        expect(mockGetJsonDataFromFile).toHaveBeenNthCalledWith(1, BASE_STUB_FILE);
        expect(mockGetJsonDataFromFile).toHaveBeenNthCalledWith(2, BASE_FILE);

        // check calls to mergeJsonObjects
        expect(mockMergeJsonObjects).toHaveBeenNthCalledWith(1, stubJson.devDependencies, baseJson.devDependencies);
        expect(mockMergeJsonObjects).not.toHaveBeenNthCalledWith(1, stubJson.dependencies, baseJson.dependencies);

        // check calls to writeJsonDataToFile
        expect(mockWriteJsonDataToFile).toHaveBeenNthCalledWith(1, BASE_FILE, updatedJsonNoBootstrap);

        // check the final snapshot
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should pass if the file package.json has been updated with the merged dependencies", async () => {

        vol.fromJSON(
            {
                [BASE_FILE]: JSON.stringify(baseJson),
                [BASE_STUB_FILE]: JSON.stringify(stubJson)
            },
            '/'
        );

        await addDependenciesToPackageJson(BASE_STUB_FILE, BASE_FILE, true);

        // check calls to getJsonDataFromFile
        expect(mockGetJsonDataFromFile).toHaveBeenNthCalledWith(1, BASE_STUB_FILE);
        expect(mockGetJsonDataFromFile).toHaveBeenNthCalledWith(2, BASE_FILE);

        // check calls to mergeJsonObjects
        expect(mockMergeJsonObjects).toHaveBeenNthCalledWith(1, stubJson.devDependencies, baseJson.devDependencies);
        expect(mockMergeJsonObjects).toHaveBeenNthCalledWith(2, stubJson.dependencies, baseJson.dependencies);

        // check calls to writeJsonDataToFile
        expect(mockWriteJsonDataToFile).toHaveBeenNthCalledWith(1, BASE_FILE, updatedJsonBootstrap);

        // check the final snapshot
        expect(vol.toJSON()).toMatchSnapshot();
    });
});