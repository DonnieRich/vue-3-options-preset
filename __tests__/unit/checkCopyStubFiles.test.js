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
                [`${BASE_STUBS_DIR}/App.vue`]: "New App.vue",
                [`${BASE_STUBS_DIR}/general.scss`]: "General SCSS",
                [`${BASE_STUBS_DIR}/HelloWorld.vue`]: "New component",
                [`${BASE_STUBS_DIR}/main.js`]: "New main.js",
                [`${BASE_DIR}/justAFile.js`]: "...",
                [`${BASE_DIR}/components/HelloWorld.vue`]: "Old component",
                [`${BASE_DIR}/App.vue`]: "Old App.vue"
            },
            "/"
        );

        await copyStubFiles(BASE_STUBS_DIR, BASE_DIR, false);
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should pass if the stub files are copied in the new location with SCSS file for Bootstrap", async () => {

        vol.fromJSON(
            {
                [`${BASE_STUBS_DIR}/App-bootstrap.vue`]: "New App.vue WITH BOOTSTRAP",
                [`${BASE_STUBS_DIR}/general-bootstrap.scss`]: "General SCSS WITH BOOTSTRAP",
                [`${BASE_STUBS_DIR}/HelloWorld.vue`]: "New component",
                [`${BASE_STUBS_DIR}/main.js`]: "New main.js",
                [`${BASE_DIR}/justAFile.js`]: "...",
                [`${BASE_DIR}/components/HelloWorld.vue`]: "Old component",
                [`${BASE_DIR}/App.vue`]: "Old App.vue"
            },
            "/"
        );

        await copyStubFiles(BASE_STUBS_DIR, BASE_DIR, true);
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should fail if the stub files for Bootstrap are missing", async () => {

        vol.fromJSON(
            {
                [`${BASE_STUBS_DIR}/App.vue`]: "New App.vue",
                [`${BASE_STUBS_DIR}/general.scss`]: "General SCSS",
                [`${BASE_STUBS_DIR}/HelloWorld.vue`]: "New component",
                [`${BASE_STUBS_DIR}/main.js`]: "New main.js",
                [`${BASE_DIR}/justAFile.js`]: "...",
                [`${BASE_DIR}/components/HelloWorld.vue`]: "old component",
                [`${BASE_DIR}/App.vue`]: "Old App.vue"
            },
            "/"
        );

        await expect(() => copyStubFiles(BASE_STUBS_DIR, BASE_DIR, true)).rejects.toThrow(Error);
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should fail if the stub files are missing", async () => {

        vol.fromJSON(
            {
                [`${BASE_STUBS_DIR}/App-bootstrap.vue`]: "New App.vue WITH BOOTSTRAP",
                [`${BASE_STUBS_DIR}/general-bootstrap.scss`]: "General SCSS WITH BOOTSTRAP",
                [`${BASE_DIR}/justAFile.js`]: "...",
                [`${BASE_DIR}/components/HelloWorld.vue`]: "old component",
                [`${BASE_DIR}/App.vue`]: "Old App.vue"
            },
            "/"
        );

        await expect(() => copyStubFiles(BASE_STUBS_DIR, BASE_DIR, true)).rejects.toThrow(Error);
        expect(vol.toJSON()).toMatchSnapshot();
    });
});