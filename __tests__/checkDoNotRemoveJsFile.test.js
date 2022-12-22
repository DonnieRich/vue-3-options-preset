const { vol } = require("memfs");
const fs = require("fs/promises");

jest.mock("fs/promises");

const { removeCssFile } = require("../src/bin/removeCssFile");

describe(removeCssFile, () => {
    beforeEach(() => {
        vol.reset();
    });

    it("It should pass if the file main.js has not been removed", async () => {

        const json = {
            "/src/main.js": "my js"
        };
        vol.fromJSON(
            json,
            "/"
        );

        await removeCssFile("/src");
        expect(vol.toJSON()).toEqual(json);
    });
});