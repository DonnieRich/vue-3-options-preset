const fs = require("fs/promises");

const mergeJsonObjects = async (stubJson, packageJson) => {
    console.log('\x1b[37m%s\x1b[0m', `📑  Merging JSON objects...`);
    let jsonData = packageJson ?? {};

    try {
        const stubPackageJsonKeys = stubJson.keys();

        stubPackageJsonKeys.forEach(key => {
            jsonData[key] = stubJson[key];
        });

    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', `❌  Error! Cannot merge JSON objects. Error: ${err}`);
    }

    return jsonData;
}

module.exports = { mergeJsonObjects };