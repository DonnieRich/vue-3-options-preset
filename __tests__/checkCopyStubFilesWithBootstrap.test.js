const { vol } = require("memfs");
//const fs = require("fs/promises");

jest.mock("fs/promises");

const { copyStubFiles } = require("../src/bin/copyStubFiles");

describe(copyStubFiles, () => {
    beforeEach(() => {
        vol.reset();
    });

    it("It should pass if the stub files are copied in the new location with SCSS file for Bootstrap", async () => {

        vol.fromJSON(
            {
                "/node_modules/vue-3-options-preset/src/stubs/App.vue": "...",
                "/node_modules/vue-3-options-preset/src/stubs/general-bootstrap.scss": "...",
                "/node_modules/vue-3-options-preset/src/stubs/HelloWorld.vue": "...",
                "/node_modules/vue-3-options-preset/src/stubs/main.js": "...",
                "/src/justAFile.js": "...",
                "/src/components/HelloWorld.vue": "old component"
            },
            "/"
        );

        await copyStubFiles("/node_modules/vue-3-options-preset/src/stubs", "/src", true);
        expect(vol.toJSON()).toMatchSnapshot();
    });
});