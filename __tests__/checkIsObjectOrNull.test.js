const { isObjectOrNull } = require('../src/utils/isObjectOrNull');

describe(isObjectOrNull, () => {

    it("It should return true if the item is an object", async () => {

        const stubJson = {
            devDependencies: {
                sass: "^1.57.1"
            }
        };

        expect(isObjectOrNull(stubJson.devDependencies)).toBe(true);

        expect(isObjectOrNull({})).toBe(true);
    });

    it("It should return true if the item is null", async () => {

        expect(isObjectOrNull(null)).toBe(true);

    });

    it("It should return false if the item is null", async () => {

        expect(isObjectOrNull(1)).toBe(false);

        expect(isObjectOrNull([])).toBe(false);

    });

});