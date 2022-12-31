const { getJsonDataFromFile } = require("./getJsonDataFromFile");
const { mergeJsonObjects } = require("./mergeJsonObjects");
const { writeJsonDataToFile } = require("./writeJsonDataToFile");

const addDependenciesToPackageJson = async (baseStubsDir, baseDir, bootstrap) => {
    console.log('\x1b[37m%s\x1b[0m', '📑  Adding dependencies to package.json...');

    let stubPackageJson = {};
    let projectPackageJson = {};

    try {
        stubPackageJson = await getJsonDataFromFile(baseStubsDir);
        projectPackageJson = await getJsonDataFromFile(baseDir);

        projectPackageJson.devDependencies = await mergeJsonObjects(stubPackageJson.devDependencies, projectPackageJson.devDependencies);

        // adding bootstrap and popper to dependencies
        if (bootstrap) {
            projectPackageJson.dependencies = await mergeJsonObjects(stubPackageJson.dependencies, projectPackageJson.dependencies);
        }

        console.log(JSON.stringify(projectPackageJson));

        await writeJsonDataToFile(baseDir, projectPackageJson);

        console.log('\x1b[36m%s\x1b[0m', '✅  Dependencies added successfully!');

    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', `❌  Error! Cannot add new dependencies to package.json. Error: ${err}`);
    }
}

module.exports = { addDependenciesToPackageJson };