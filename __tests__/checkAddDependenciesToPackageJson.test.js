const { vol } = require("memfs");
jest.mock("fs/promises");

const { addDependenciesToPackageJson } = require("../src/bin/addDependenciesToPackageJson");
const { jsonOperations } = require("../src/bin/jsonOperations");

const BASE_FILE = '/package.json';
const BASE_STUB_FILE = '/node_modules/vue-3-options-preset/src/stubs/package.json';

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

    const stubJson = {
        dependencies: {
            "@popperjs/core": "^2.11.6",
            bootstrap: "^5.2.3"
        },
        devDependencies: {
            sass: "^1.57.1"
        }
    };

    const baseJson = {
        license: "MIT",
        dependencies: {
            shelljs: "^0.8.5"
        },
        devDependencies: {
            jest: "^29.3.1",
            memfs: "^3.4.12"
        }
    };

    const updatedJsonNoBootstrap = {
        license: "MIT",
        dependencies: {
            shelljs: "^0.8.5"
        },
        devDependencies: {
            sass: "^1.57.1",
            jest: "^29.3.1",
            memfs: "^3.4.12"
        }
    };

    const updatedJsonBootstrap = {
        license: "MIT",
        dependencies: {
            shelljs: "^0.8.5",
            "@popperjs/core": "^2.11.6",
            bootstrap: "^5.2.3"
        },
        devDependencies: {
            sass: "^1.57.1",
            jest: "^29.3.1",
            memfs: "^3.4.12"
        }
    };

    it("It should pass if the file package.json has been updated with the merged devDependencies", async () => {

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

    it("It should pass if the file package.json has been updated with the merged dependencies", async () => {

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