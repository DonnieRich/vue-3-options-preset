const { vol } = require("memfs");
jest.mock("fs/promises");

const { copyStubFiles } = require("../../src/bin/copyStubFiles");

// import all json config files
const { config } = require('../../src/config/config');
const { BASE_DIR, BASE_STUBS_DIR } = config.get();

describe(copyStubFiles, () => {
    beforeEach(() => {
        vol.reset();
    });

    it("Should pass if the stub files are copied in the new location", async () => {

        vol.fromJSON(
            {
                [`${BASE_STUBS_DIR}/default/App.vue`]: "New App.vue",
                [`${BASE_STUBS_DIR}/default/general.scss`]: "General SCSS",
                [`${BASE_STUBS_DIR}/default/HelloWorld.vue`]: "New component",
                [`${BASE_STUBS_DIR}/default/main.js`]: "New main.js",
                [`${BASE_DIR}/justAFile.js`]: "...",
                [`${BASE_DIR}/components/HelloWorld.vue`]: "Old component",
                [`${BASE_DIR}/App.vue`]: "Old App.vue"
            },
            "/"
        );

        await copyStubFiles(`${BASE_STUBS_DIR}/default`, BASE_DIR);
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should pass if the stub files are copied in the new location with SCSS file for Bootstrap", async () => {

        vol.fromJSON(
            {
                [`${BASE_STUBS_DIR}/bootstrap/App.vue`]: "New App.vue WITH BOOTSTRAP",
                [`${BASE_STUBS_DIR}/bootstrap/general.scss`]: "General SCSS WITH BOOTSTRAP",
                [`${BASE_STUBS_DIR}/bootstrap/HelloWorld.vue`]: "New component",
                [`${BASE_STUBS_DIR}/bootstrap/main.js`]: "New main.js WITH BOOTSTRAP",
                [`${BASE_DIR}/justAFile.js`]: "...",
                [`${BASE_DIR}/components/HelloWorld.vue`]: "Old component",
                [`${BASE_DIR}/App.vue`]: "Old App.vue"
            },
            "/"
        );

        await copyStubFiles(`${BASE_STUBS_DIR}/bootstrap`, BASE_DIR);
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should fail if the stub files for Bootstrap are missing", async () => {

        vol.fromJSON(
            {
                [`${BASE_STUBS_DIR}/default/App.vue`]: "New App.vue",
                [`${BASE_STUBS_DIR}/default/general.scss`]: "General SCSS",
                [`${BASE_STUBS_DIR}/default/HelloWorld.vue`]: "New component",
                [`${BASE_STUBS_DIR}/default/main.js`]: "New main.js",
                [`${BASE_DIR}/justAFile.js`]: "...",
                [`${BASE_DIR}/components/HelloWorld.vue`]: "old component",
                [`${BASE_DIR}/App.vue`]: "Old App.vue"
            },
            "/"
        );

        await expect(() => copyStubFiles(`${BASE_STUBS_DIR}/bootstrap`, BASE_DIR)).rejects.toThrow(Error);
        expect(vol.toJSON()).toMatchSnapshot();
    });

    it("Should fail if the stub files are missing", async () => {

        vol.fromJSON(
            {
                [`${BASE_STUBS_DIR}/bootstrap/App.vue`]: "New App.vue WITH BOOTSTRAP",
                [`${BASE_STUBS_DIR}/bootstrap/general.scss`]: "General SCSS WITH BOOTSTRAP",
                [`${BASE_STUBS_DIR}/bootstrap/main.js`]: "New main.js WITH BOOTSTRAP",
                [`${BASE_DIR}/justAFile.js`]: "...",
                [`${BASE_DIR}/components/HelloWorld.vue`]: "old component",
                [`${BASE_DIR}/App.vue`]: "Old App.vue"
            },
            "/"
        );

        await expect(() => copyStubFiles(`${BASE_STUBS_DIR}/default`, BASE_DIR)).rejects.toThrow(Error);
        expect(vol.toJSON()).toMatchSnapshot();
    });
});