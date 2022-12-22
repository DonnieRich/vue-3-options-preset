const { vol } = require("memfs");

jest.mock("fs/promises");

const { removeCssFile } = require("../src/bin/removeCssFile");

describe(removeCssFile, () => {
    beforeEach(() => {
        vol.reset();
    });

    it("It should pass if the file style.css has been found and removed", async () => {

        vol.fromJSON(
            {
                "/src/style.css": "my style"
            },
            "/"
        );

        await removeCssFile("/src");
        expect(vol.toJSON()).toMatchSnapshot();
    });
});