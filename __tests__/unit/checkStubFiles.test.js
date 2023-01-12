const fs = require('fs');
const fsPromises = fs.promises;

const BASE_PATH = './src/stubs/';

const checkFile = async (file) => {

    // https://nodejs.org/api/fs.html#fspromisesaccesspath-mode
    await expect(fsPromises.access(file, fs.constants.F_OK)).resolves.toBeUndefined();

};

describe("Checking stub file presence", () => {

    it("Should pass if the stub files are present", async () => {

        const appVue = `${BASE_PATH}App.vue`;
        const generalScss = `${BASE_PATH}general.scss`;
        const helloWorld = `${BASE_PATH}HelloWorld.vue`;
        const mainJs = `${BASE_PATH}main.js`;

        await Promise.all([
            checkFile(appVue),
            checkFile(generalScss),
            checkFile(helloWorld),
            checkFile(mainJs),
        ]);

    });

    it("Should pass if the stub files for Bootstrap are present", async () => {

        const appVue = `${BASE_PATH}App-bootstrap.vue`;
        const generalScss = `${BASE_PATH}general-bootstrap.scss`;

        // expect(await fs.exists(appVue)).toBe(true);
        // expect(await fs.exists(generalScss)).toBe(true);

        await Promise.all([
            checkFile(appVue),
            checkFile(generalScss)
        ]);

    });

});