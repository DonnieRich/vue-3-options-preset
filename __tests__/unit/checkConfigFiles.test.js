describe("Configuration files integrity", () => {

    // https://www.webtips.dev/how-to-mock-processenv-in-jest
    const env = { ...process.env };

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...env };
    });

    afterEach(() => {
        process.env = env;
    });

    it("Should pass if production configuration match data provided", () => {

        process.env.NODE_ENV = "production";
        const { config: production } = require('../../src/config/config');

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

        process.env.NODE_ENV = "production";
        const { config: production } = require('../../src/config/config');

        const { EXTENSIONS } = production.get();

        expect(EXTENSIONS).not.toEqual(['.json', '.scss']);

    });

    it("Should pass if develop configuration match data provided", () => {

        process.env.NODE_ENV = "";
        const { config } = require('../../src/config/config');

        const { BASE_DIR, BASE_STUBS_DIR, JSON_FILE, COMPONENT_FOLDER, EXTENSIONS, PROTECTED_FILES } = config.get();

        expect(BASE_DIR).toBe("/src");
        expect(BASE_STUBS_DIR).toBe("/node_modules/vue-3-options-preset/src/stubs");
        expect(JSON_FILE).toBe("/package.json");
        expect(COMPONENT_FOLDER).toBe("/components");

        expect(EXTENSIONS).toEqual(['.css', '.vue']);

        expect(PROTECTED_FILES).toContain('App.vue');
        expect(PROTECTED_FILES).toEqual(['App.vue']);

    });

    it("Should pass if test configuration match data provided", () => {

        process.env.NODE_ENV = "test";
        const { config: test } = require('../../src/config/config');

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

        process.env.NODE_ENV = "test";
        const { config: test } = require('../../src/config/config');

        const { EXTENSIONS } = test.get();

        expect(EXTENSIONS).not.toEqual(['.json', '.scss']);

    });

});