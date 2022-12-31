const { vol } = require("memfs");
jest.mock("fs/promises");

const { addDependenciesToPackageJson } = require("../src/bin/addDependenciesToPackageJson");
// const { getJsonDataFromFile } = require("../src/bin/getJsonDataFromFile");
// const { mergeJsonObjects } = require("../src/bin/mergeJsonObjects");
// const { writeJsonDataToFile } = require("../src/bin/writeJsonDataToFile");

describe(addDependenciesToPackageJson, () => {
    beforeEach(() => {
        vol.reset();
    });

    it("It should pass if the file package.json has been updated with the data provided", async () => {

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

        vol.fromJSON(
            {
                "/package.json": JSON.stringify(baseJson),
                "/node_modules/vue-3-options-preset/src/stubs/package.json": JSON.stringify(stubJson)
            },
            '/'
        );

        await addDependenciesToPackageJson("/node_modules/vue-3-options-preset/src/stubs/package.json", "/package.json", false);

        const updatedJson = {
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

        expect(vol.toJSON()).toMatchSnapshot();
    });
});