const { vol } = require("memfs");
jest.mock("fs/promises");

const { writeJsonDataToFile } = require("../src/bin/writeJsonDataToFile");

// import all json config files
const config = require('../__mocks__/src/config/production.json');
const JSON_FILE = config.JSON_FILE;

describe(writeJsonDataToFile, () => {
    beforeEach(() => {
        vol.reset();
    });

    it("It should pass if the file package.json has been updated with the data provided", async () => {

        const data = {
            check: true
        };

        vol.fromJSON(
            {
                [JSON_FILE]: "..."
            },
            '/'
        );

        await writeJsonDataToFile(JSON_FILE, data);
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("It should pass if the file package.json has been updated with the complex data provided", async () => {

        const data = {
            check: true,
            dependencies: {
                first: "first",
                second: 2
            },
            devDependencies: {
                third: false,
                fourth: "ok"
            }
        };

        vol.fromJSON(
            {
                [JSON_FILE]: "..."
            },
            '/'
        );

        await writeJsonDataToFile(JSON_FILE, data);
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("It should throw an error if called with an empty object", async () => {

        const data = {
        };

        vol.fromJSON(
            {
                [JSON_FILE]: "..."
            },
            '/'
        );

        await expect(() => writeJsonDataToFile(JSON_FILE, data)).rejects.toThrow("Empty object provided!");
    });
});