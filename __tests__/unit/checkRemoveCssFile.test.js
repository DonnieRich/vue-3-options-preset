const { vol } = require("memfs");
jest.mock("fs/promises");

const { removeCssFile } = require("../../src/bin/removeCssFile");

// import all json config files
const { config } = require('../../src/config/config.test');
const { BASE_DIR } = config.get();

describe(removeCssFile, () => {
    beforeEach(() => {
        vol.reset();
    });

    it("Should pass if the file style.css has been found and removed", async () => {

        vol.fromJSON(
            {
                [`${BASE_DIR}/style.css`]: "my style"
            },
            "/"
        );

        await removeCssFile(BASE_DIR);
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should pass if the file main.js has not been removed", async () => {

        const json = {
            [`${BASE_DIR}/main.js`]: "my js"
        };
        vol.fromJSON(
            json,
            "/"
        );

        await removeCssFile(BASE_DIR);
        expect(vol.toJSON()).toEqual(json);
    });
});