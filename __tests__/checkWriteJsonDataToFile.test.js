const { vol } = require("memfs");

jest.mock("fs/promises");

const { writeJsonDataToFile } = require("../src/bin/writeJsonDataToFile");

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
                "package.json": "..."
            },
            '/'
        );

        await writeJsonDataToFile("", data);
        expect(vol.toJSON()).toMatchSnapshot();
    });
});