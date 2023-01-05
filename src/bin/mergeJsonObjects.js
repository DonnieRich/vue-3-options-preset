const { isObjectOrNull } = require('../utils/isObjectOrNull');

const mergeJsonObjects = async (stubJson, packageJson) => {
    console.log('\x1b[37m%s\x1b[0m', `📑  Merging JSON objects...`);

    if (!isObjectOrNull(stubJson) || !isObjectOrNull(packageJson)) {
        throw new Error(`Parameter is not an object!`);
    }

    let jsonData = { ...packageJson };

    const stubPackageJsonKeys = Object.keys(stubJson);

    stubPackageJsonKeys.forEach(key => {
        jsonData[key] = stubJson[key];
    });

    return jsonData;
}

module.exports = { mergeJsonObjects };