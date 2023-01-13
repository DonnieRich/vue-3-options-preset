const { vol } = require("memfs");
jest.mock("fs/promises");

const { removeFile } = require("../../src/bin/removeFile");

// import all json config files
const { config } = require('../../src/config/config.test');
const { BASE_DIR } = config.get();

describe(removeFile, () => {
    beforeEach(() => {
        vol.reset();
    });

    it("Should pass if the file style.css has been removed", async () => {

        vol.fromJSON(
            {
                [`${BASE_DIR}/style.css`]: "my style"
            },
            "/"
        );

        await removeFile(BASE_DIR, '.css');
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should pass if all .css files have been removed", async () => {

        vol.fromJSON(
            {
                [`${BASE_DIR}/styles/style.css`]: "my style",
                [`${BASE_DIR}/styles/base.css`]: "my base style",
            },
            "/"
        );

        await removeFile(`${BASE_DIR}/styles`, '.css');
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

        await removeFile(BASE_DIR, '.css');
        expect(vol.toJSON()).toEqual(json);
    });

    it("Should pass if the file Test.vue has been removed", async () => {

        const json = {
            [`${BASE_DIR}/Test.vue`]: "my vue"
        };
        vol.fromJSON(
            json,
            "/"
        );

        await removeFile(BASE_DIR, '.vue');
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should pass if the file App.vue has not been removed", async () => {

        const json = {
            [`${BASE_DIR}/Test.vue`]: "my vue",
            [`${BASE_DIR}/App.vue`]: "my App vue"
        };
        vol.fromJSON(
            json,
            "/"
        );

        await removeFile(BASE_DIR, '.vue');
        expect(vol.toJSON()).toMatchSnapshot();
    });
});