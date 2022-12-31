const { mergeJsonObjects } = require("../src/bin/mergeJsonObjects");

describe(mergeJsonObjects, () => {

    it("It should pass if the two objects are merged", async () => {

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
});