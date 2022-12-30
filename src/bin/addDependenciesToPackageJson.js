const fs = require("fs/promises");
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

        // adding devDependencies - ie. Sass
        // const stubPackageJsonDependenciesKeys = stubPackageJson.devDependencies.keys();

        // stubPackageJsonDependenciesKeys.forEach(key => {
        //     projectPackageJson.devDependencies[key] = stubPackageJson.devDependencies[key];
        // });

        projectPackageJson.devDependencies = await { ...mergeJsonObjects(stubPackageJson.devDependencies, projectPackageJson.devDependencies) };

        // adding bootstrap and popper to dependencies
        if (bootstrap) {
            // const stubPackageJsonDependenciesKeys = stubPackageJson.dependencies.keys();

            // stubPackageJsonDependenciesKeys.forEach(key => {
            //     projectPackageJson.dependencies[key] = stubPackageJson.dependencies[key];
            // });

            projectPackageJson.dependencies = await { ...mergeJsonObjects(stubPackageJson.dependencies, projectPackageJson.dependencies) };
        }

        await writeJsonDataToFile(baseDir, projectPackageJson);

        console.log('\x1b[36m%s\x1b[0m', '✅  Dependencies added successfully!');

    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', `❌  Error! Cannot add new dependencies to package.json. Error: ${err}`);
    }
}

module.exports = { addDependenciesToPackageJson };