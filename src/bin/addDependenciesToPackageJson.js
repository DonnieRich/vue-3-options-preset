// const { getJsonDataFromFile } = require("./getJsonDataFromFile");
// const { mergeJsonObjects } = require("./mergeJsonObjects");
// const { writeJsonDataToFile } = require("./writeJsonDataToFile");

const { jsonOperations } = require("./jsonOperations");

const addDependenciesToPackageJson = async (baseStubsFile, baseFile, bootstrap) => {
    console.log('\x1b[37m%s\x1b[0m', '📑  Adding dependencies to package.json...');

    let stubPackageJson = {};
    let projectPackageJson = {};

    stubPackageJson = await jsonOperations.getJsonDataFromFile(baseStubsFile);
    projectPackageJson = await jsonOperations.getJsonDataFromFile(baseFile);

    projectPackageJson.devDependencies = await jsonOperations.mergeJsonObjects(stubPackageJson.devDependencies, projectPackageJson.devDependencies);

    // adding bootstrap and popper to dependencies
    if (bootstrap) {
        projectPackageJson.dependencies = await jsonOperations.mergeJsonObjects(stubPackageJson.dependencies, projectPackageJson.dependencies);
    }

    await jsonOperations.writeJsonDataToFile(baseFile, projectPackageJson);

}

module.exports = { addDependenciesToPackageJson };