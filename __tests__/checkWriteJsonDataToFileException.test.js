const { vol } = require("memfs");

jest.mock("fs/promises");

const { writeJsonDataToFile } = require("../src/bin/writeJsonDataToFile");

describe(writeJsonDataToFile, () => {
    beforeEach(() => {
        vol.reset();
    });

    it("It should throw an error if called with an empty object", async () => {

        const data = {
        };

        vol.fromJSON(
            {
                "/package.json": "..."
            },
            '/'
        );

        await expect(() => writeJsonDataToFile("/package.json", data)).rejects.toThrow("Empty object provided!");
    });
});