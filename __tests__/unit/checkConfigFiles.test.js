// import all json config files
const { config: test } = require('../../src/config/config.test');
const { config: production } = require('../../src/config/config.production');

describe("Configuration files integrity", () => {

    it("Should pass if test configuration match data provided", () => {

        const { BASE_DIR, BASE_STUBS_DIR, JSON_FILE, COMPONENT_FOLDER, EXTENSIONS, PROTECTED_FILES } = test.get();

        expect(BASE_DIR).toBe("/src");
        expect(BASE_STUBS_DIR).toBe("/node_modules/vue-3-options-preset/src/stubs");
        expect(JSON_FILE).toBe("/package.json");
        expect(COMPONENT_FOLDER).toBe("/components");

        expect(EXTENSIONS).toEqual(['.css', '.vue']);

        expect(PROTECTED_FILES).toContain('App.vue');
        expect(PROTECTED_FILES).toEqual(['App.vue']);

    });

    it("Should pass if test configuration doesn't match data provided", () => {

        const { EXTENSIONS } = test.get();

        expect(EXTENSIONS).not.toEqual(['.json', '.scss']);

    });

    it("Should pass if production configuration match data provided", () => {

        const { BASE_DIR, BASE_STUBS_DIR, JSON_FILE, COMPONENT_FOLDER, EXTENSIONS, PROTECTED_FILES } = production.get();

        expect(BASE_DIR).toBe("./src");
        expect(BASE_STUBS_DIR).toBe("./node_modules/vue-3-options-preset/src/stubs");
        expect(JSON_FILE).toBe("/package.json");
        expect(COMPONENT_FOLDER).toBe("/components");

        expect(EXTENSIONS).toEqual(['.css', '.vue']);

        expect(PROTECTED_FILES).toContain('App.vue');
        expect(PROTECTED_FILES).toEqual(['App.vue']);

    });

    it("Should pass if production configuration doesn't match data provided", () => {

        const { EXTENSIONS } = production.get();

        expect(EXTENSIONS).not.toEqual(['.json', '.scss']);

    });

});