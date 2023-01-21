const { vol } = require("memfs");
jest.mock("fs/promises");

const { removeEmptyFolders } = require("../../src/bin/removeEmptyFolders");

// import all json config files
const { config } = require('../../src/config/config.test');
const { BASE_DIR, COMPONENT_FOLDER, REMOVABLE_FOLDERS } = config.get();

describe(removeEmptyFolders, () => {
    beforeEach(() => {
        vol.reset();
    });

    it("Should pass if the empty folder is removed", async () => {

        const json = {
            [`${BASE_DIR}/App.vue`]: "my App.vue",
            [`${BASE_DIR}${COMPONENT_FOLDER}/HelloWorld.vue`]: "my HelloWorld.vue",
            [`${BASE_DIR}/styles/style.css`]: "my style.css",
            [REMOVABLE_FOLDERS[0]]: null
        }

        vol.fromJSON(
            json,
            "/"
        );

        await expect(removeEmptyFolders(`${REMOVABLE_FOLDERS[0]}`, REMOVABLE_FOLDERS))
            .resolves.toBe(`✅  ${REMOVABLE_FOLDERS[0]} directory removed!`);
    });

    it(`Should fail silently if the ${REMOVABLE_FOLDERS[0]} folder is not empty`, async () => {

        const json = {
            [`${BASE_DIR}${COMPONENT_FOLDER}/HelloWorld.vue`]: "my HelloWorld.vue",
            [`${REMOVABLE_FOLDERS[0]}/Icon.vue`]: "my Icon.vue"
        };
        vol.fromJSON(
            json,
            "/"
        );

        await expect(removeEmptyFolders(`${REMOVABLE_FOLDERS[0]}`, REMOVABLE_FOLDERS))
            .rejects.toThrow(`ENOTEMPTY: directory not empty, rmdir '${REMOVABLE_FOLDERS[0]}'`);

    });

    it(`Should fail silently if the ${REMOVABLE_FOLDERS[0]} is missing`, async () => {

        const json = {
            [`${BASE_DIR}/styles/style.css`]: "my style.css",
            [`${BASE_DIR}${COMPONENT_FOLDER}/HelloWorld.vue`]: "my HelloWorld.vue",
            [`${BASE_DIR}/App.vue`]: "my App.vue",
        };
        vol.fromJSON(
            json,
            "/"
        );

        await expect(removeEmptyFolders(`${REMOVABLE_FOLDERS[0]}`, REMOVABLE_FOLDERS))
            .rejects.toThrow(`ENOENT: no such file or directory, rmdir '${REMOVABLE_FOLDERS[0]}'`);
    });

    it(`Should fail silently if the /do-not-remove folder is not in the REMOVABLE_FOLDERS array`, async () => {

        const json = {
            [`${BASE_DIR}/styles/style.css`]: "my style.css",
            [`${BASE_DIR}${COMPONENT_FOLDER}/HelloWorld.vue`]: "my HelloWorld.vue",
            [`${BASE_DIR}/App.vue`]: "my App.vue",
            '/do-not-remove/random-file.txt': 'a random file'
        };
        vol.fromJSON(
            json,
            "/"
        );

        await expect(removeEmptyFolders('/do-not-remove', REMOVABLE_FOLDERS))
            .rejects.toThrow('⚠️  /do-not-remove directory should not be removed!');
    });
});