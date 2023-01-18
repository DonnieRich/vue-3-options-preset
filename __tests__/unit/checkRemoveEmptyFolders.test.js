const { vol, fs } = require("memfs");
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
        }

        const expectedJson = {
            [`${BASE_DIR}/App.vue`]: "my App.vue",
            [`${BASE_DIR}${COMPONENT_FOLDER}/HelloWorld.vue`]: "my HelloWorld.vue",
            [`${BASE_DIR}/styles/style.css`]: "my style.css",
        }

        vol.fromJSON(
            json,
            "/"
        );
        vol.mkdirSync('/src/components/icons/');
        vol.mkdirSync('/src/components/aaa/');

        await removeEmptyFolders([BASE_DIR, `${BASE_DIR}${COMPONENT_FOLDER}`, `${BASE_DIR}/styles`, `${REMOVABLE_FOLDERS[0]}`], REMOVABLE_FOLDERS);
        //expect(vol.toJSON()).toMatchSnapshot();
        expect(vol.toJSON()).toEqual(expectedJson)
    });

    /*it(`Should fail if the ${REMOVABLE_FOLDERS[0]} folder is not empty`, async () => {

        const json = {
            [`${BASE_DIR}${COMPONENT_FOLDER}/HelloWorld.vue`]: "my HelloWorld.vue",
            [`${REMOVABLE_FOLDERS[0]}/Icon.vue`]: "my Icon.vue"
        };
        vol.fromJSON(
            json,
            "/"
        );

        await removeEmptyFolders([BASE_DIR, `${BASE_DIR}${COMPONENT_FOLDER}`, `${REMOVABLE_FOLDERS[0]}`], REMOVABLE_FOLDERS);
        expect(vol.toJSON()).toEqual(json);
    });*/

    /*it("Should pass if the styles directory has not been removed, even if empty", async () => {

        const json = {
            [`${BASE_DIR}/styles`]: null,
            [`${BASE_DIR}${COMPONENT_FOLDER}/HelloWorld.vue`]: "my HelloWorld.vue"
        };
        vol.fromJSON(
            json,
            "/"
        );

        await removeEmptyFolders([BASE_DIR, `${BASE_DIR}${COMPONENT_FOLDER}`, `${BASE_DIR}/styles`], REMOVABLE_FOLDERS);
        expect(vol.toJSON()).toEqual(json);
    });

    it(`Should pass even if the ${REMOVABLE_FOLDERS[0]} is missing`, async () => {

        const json = {
            [`${BASE_DIR}/styles/style.css`]: "my style.css",
            [`${BASE_DIR}${COMPONENT_FOLDER}/HelloWorld.vue`]: "my HelloWorld.vue",
            [`${BASE_DIR}/App.vue`]: "my App.vue",
        };
        vol.fromJSON(
            json,
            "/"
        );

        await removeEmptyFolders([BASE_DIR, `${BASE_DIR}${COMPONENT_FOLDER}`, `${BASE_DIR}/styles`, `${REMOVABLE_FOLDERS[0]}`], REMOVABLE_FOLDERS);
        expect(vol.toJSON()).toEqual(json);
    });*/
});