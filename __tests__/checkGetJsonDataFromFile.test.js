const { vol } = require("memfs");

jest.mock("fs/promises");

const { getJsonDataFromFile } = require("../src/bin/getJsonDataFromFile");

describe(getJsonDataFromFile, () => {
    beforeEach(() => {
        vol.reset();
    });

    it("It should pass if the file package.json has been found and the content is read and converted to an object", async () => {

        vol.fromJSON(
            {
                "package.json": "{ \"check\": true }"
            },
            '/'
        );

        console.log(vol.toJSON());

        const jsonData = await getJsonDataFromFile("");
        expect(jsonData).toEqual({ check: true });
    });
});