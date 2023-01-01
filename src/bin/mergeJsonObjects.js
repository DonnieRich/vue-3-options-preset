const fs = require("fs/promises");

const mergeJsonObjects = async (stubJson, packageJson) => {
    console.log('\x1b[37m%s\x1b[0m', `📑  Merging JSON objects...`);
    let jsonData = { ...packageJson };

    const stubPackageJsonKeys = Object.keys(stubJson);

    stubPackageJsonKeys.forEach(key => {
        jsonData[key] = stubJson[key];
    });

    return jsonData;
}

module.exports = { mergeJsonObjects };