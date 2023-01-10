const { mergeJsonObjects } = require("../../src/bin/mergeJsonObjects");

describe(mergeJsonObjects, () => {

    it("Should pass if the two objects are merged", async () => {

        const stubJson = {
            devDependencies: {
                sass: "^1.57.1"
            }
        };

        const packageJson = {
            devDependencies: {
                jest: "^29.3.1"
            }
        };

        expect(await mergeJsonObjects(stubJson.devDependencies, packageJson.devDependencies)).toEqual({
            sass: "^1.57.1",
            jest: "^29.3.1"
        });

        expect(await mergeJsonObjects(stubJson.devDependencies, null)).toEqual({
            sass: "^1.57.1"
        });

    });

    it("Should fail if one of the two parameters is not an object", async () => {

        const stubJson = {
            devDependencies: {
                sass: "^1.57.1"
            }
        };

        const packageJson = {
            devDependencies: {
                jest: "^29.3.1"
            }
        };

        await expect(() => mergeJsonObjects([], packageJson.devDependencies)).rejects.toThrow(Error);

        await expect(() => mergeJsonObjects(stubJson.devDependencies, [])).rejects.toThrow(Error);

    });
});