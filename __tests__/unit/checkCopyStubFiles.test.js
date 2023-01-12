const { vol } = require("memfs");
jest.mock("fs/promises");

const { copyStubFiles } = require("../../src/bin/copyStubFiles");

// import all json config files
const { config } = require('../../src/config/config.test');
const { BASE_DIR, BASE_STUBS_DIR } = config.get();

describe(copyStubFiles, () => {
    beforeEach(() => {
        vol.reset();
    });

    it("Should pass if the stub files are copied in the new location", async () => {

        vol.fromJSON(
            {
                [`${BASE_STUBS_DIR}/App.vue`]: "...",
                [`${BASE_STUBS_DIR}/general.scss`]: "...",
                [`${BASE_STUBS_DIR}/HelloWorld.vue`]: "...",
                [`${BASE_STUBS_DIR}/main.js`]: "...",
                [`${BASE_DIR}/justAFile.js`]: "...",
                [`${BASE_DIR}/components/HelloWorld.vue`]: "old component"
            },
            "/"
        );

        await copyStubFiles(BASE_STUBS_DIR, BASE_DIR, false);
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should pass if the stub files are copied in the new location with SCSS file for Bootstrap", async () => {

        vol.fromJSON(
            {
                [`${BASE_STUBS_DIR}/App-bootstrap.vue`]: "...",
                [`${BASE_STUBS_DIR}/general-bootstrap.scss`]: "...",
                [`${BASE_STUBS_DIR}/HelloWorld.vue`]: "...",
                [`${BASE_STUBS_DIR}/main.js`]: "...",
                [`${BASE_DIR}/justAFile.js`]: "...",
                [`${BASE_DIR}/components/HelloWorld.vue`]: "old component"
            },
            "/"
        );

        await copyStubFiles(BASE_STUBS_DIR, BASE_DIR, true);
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should fail if the stub files for Bootstrap are missing", async () => {

        vol.fromJSON(
            {
                [`${BASE_STUBS_DIR}/App.vue`]: "...",
                [`${BASE_STUBS_DIR}/general.scss`]: "...",
                [`${BASE_STUBS_DIR}/HelloWorld.vue`]: "...",
                [`${BASE_STUBS_DIR}/main.js`]: "...",
                [`${BASE_DIR}/justAFile.js`]: "...",
                [`${BASE_DIR}/components/HelloWorld.vue`]: "old component"
            },
            "/"
        );

        await copyStubFiles(BASE_STUBS_DIR, BASE_DIR, true);
        await expect(() => copyStubFiles(BASE_STUBS_DIR, BASE_DIR, true)).rejects.toThrow(Error);
        expect(vol.toJSON()).toMatchSnapshot();
    });
});